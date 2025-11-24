import { render } from "solid-js/web";
import SecureChatBar from "../components/SecureChatBar";
import { encryptMessage } from "../lib/crypto";
import { isSecureMode } from "../lib/store";
import { startKeyPolling, getPublicKeys } from "../lib/api";

declare const shelter: any;

let unobserve: (() => void) | null = null;
let unintercept: (() => void) | null = null;

// Helper to observe DOM
const observeDom = (selector: string, callback: (el: Element) => void) => {
    if (shelter.observeDom) {
        return shelter.observeDom(selector, callback);
    }

    // Fallback implementation
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const n of m.addedNodes) {
                if (n instanceof Element) {
                    if (n.matches(selector)) callback(n);
                    const c = n.querySelector(selector);
                    if (c) callback(c);
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    const existing = document.querySelectorAll(selector);
    existing.forEach(e => callback(e));

    return () => observer.disconnect();
};

export const patchChatBar = () => {
    // Start polling for keys
    startKeyPolling();

    // 1. Inject UI
    // We look for the buttons container in the chat bar.
    // We use a broader selector to match both old and new class names (buttons-xyz vs buttons_xyz)
    unobserve = observeDom("form [class*='buttons']", (element) => {
        // Verify it's likely the right element (should contain buttons or be inside the form)
        // Avoid injecting into other forms if possible.
        if (!element.closest('form')) return;

        // Check if we already injected
        if (element.querySelector("#pgpcord-lock-btn")) return;

        const container = document.createElement("div");
        container.id = "pgpcord-lock-btn";
        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.marginRight = "8px"; // Add some spacing

        // Prepend to the buttons container
        element.prepend(container);

        render(() => <SecureChatBar />, container);
    });

    // 2. Intercept Message Sending
    // We intercept POST requests to /channels/:id/messages
    if (shelter.http?.intercept) {
        unintercept = shelter.http.intercept("POST", /\/channels\/\d+\/messages/, async (req: any, send: any) => {
            console.log("PGPCord: Interceptor triggered!", {
                isSecureMode: isSecureMode(),
                hasBody: !!req.body,
                bodyType: req.body?.constructor?.name,
                isFormData: req.body instanceof FormData
            });

            if (!isSecureMode()) {
                console.log("PGPCord: Not in secure mode, skipping");
                return send(req);
            }

            // Debug: Log request body structure
            console.log("PGPCord: Request body keys:", Object.keys(req.body || {}));
            console.log("PGPCord: Request body:", req.body);

            try {
                const match = req.url.match(/\/channels\/(\d+)\/messages/);
                const channelId = match ? match[1] : null;
                if (!channelId) {
                    return send(req);
                }

                let channel = shelter.util?.getChannel?.(channelId);
                if (!channel && shelter.flux?.stores?.ChannelStore) {
                    channel = shelter.flux.stores.ChannelStore.getChannel(channelId);
                }
                if (!channel) {
                    return send(req);
                }

                // Check if this is a file upload (has attachments array)
                if (req.body.attachments && Array.isArray(req.body.attachments) && req.body.attachments.length > 0) {
                    console.warn("PGPCord: File uploads cannot be encrypted (files are already on Discord CDN).");
                    console.warn("PGPCord: Only text messages can be encrypted. Please send files separately or use external encrypted file sharing.");
                    // Let file uploads pass through unencrypted
                    return send(req);
                }

                // Determine recipients
                let recipientIds: string[] = [];
                if (channel?.recipients) {
                    recipientIds = [...channel.recipients];
                } else if (channel?.guild_id) {
                    const guildId = channel.guild_id;
                    const memberIds = new Set<string>();
                    const cachedMembers = shelter.flux.stores.GuildMemberStore?.getMemberIds(guildId);
                    if (cachedMembers && Array.isArray(cachedMembers)) {
                        cachedMembers.forEach((id: string) => memberIds.add(id));
                    }
                    const messages = shelter.flux.stores.MessageStore.getMessages(channelId);
                    if (messages && messages.toArray) {
                        messages.toArray().forEach((msg: any) => {
                            if (msg.author?.id) memberIds.add(msg.author.id);
                        });
                    }
                    if (memberIds.size > 0) {
                        recipientIds = Array.from(memberIds).slice(0, 100);
                    }
                }

                const currentUser = shelter.flux?.stores?.UserStore?.getCurrentUser();
                if (currentUser && !recipientIds.includes(currentUser.id)) {
                    recipientIds.push(currentUser.id);
                }

                if (recipientIds.length === 0) {
                    console.warn("PGPCord: No recipients found");
                    return send(req);
                }

                // Get valid recipients with keys
                const keys = await getPublicKeys(recipientIds);
                const validRecipientIds = keys.map(k => k.discord_id);

                if (validRecipientIds.length === 0) {
                    console.warn("PGPCord: No valid recipients with keys found.");
                    return send(req);
                }

                // Handle text messages (object)
                const content = req.body?.content;
                if (!content) {
                    return send(req);
                }

                // Extract mentions
                const mentionRegex = /<@!?(\d+)>/g;
                const mentions = [];
                let mentionMatch;
                while ((mentionMatch = mentionRegex.exec(content)) !== null) {
                    mentions.push(mentionMatch[0]);
                }

                const encrypted = await encryptMessage(content, validRecipientIds);

                // Append mentions to preserve pings
                const finalContent = mentions.length > 0 ? `||${mentions.join(' ')}||` : '';

                // Switch to file upload
                const formData = new FormData();
                const file = new File([new Blob([encrypted], { type: 'text/plain' })], 'message.txt');
                const payload_json = { ...req.body, content: finalContent };
                formData.append('payload_json', JSON.stringify(payload_json));
                formData.append('files[0]', file, 'message.txt');

                req.body = formData;
                if (req.headers) {
                    delete req.headers['Content-Type'];
                }
            } catch (e) {
                console.error("PGPCord: Failed to encrypt", e);
            }
            return send(req);
        });
    } else {
        console.warn("PGPCord: shelter.http.intercept not found. Encryption will not work.");
    }
};

export const unpatchChatBar = () => {
    if (unobserve) unobserve();
    if (unintercept) unintercept();
    document.querySelectorAll("#pgpcord-lock-btn").forEach(e => e.remove());
};
