import { render } from "solid-js/web";
import SecureChatBar from "../components/SecureChatBar";
import { encryptMessage } from "../lib/crypto";
import { isSecureMode } from "../lib/store";

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
            if (isSecureMode() && req.body?.content) {
                try {
                    // The body is already a JS object thanks to Shelter's interceptor
                    const content = req.body.content;

                    if (content) {
                        const match = req.url.match(/\/channels\/(\d+)\/messages/);
                        const channelId = match ? match[1] : null;

                        if (channelId) {
                            let channel = shelter.util?.getChannel?.(channelId);
                            if (!channel && shelter.flux?.stores?.ChannelStore) {
                                channel = shelter.flux.stores.ChannelStore.getChannel(channelId);
                            }

                            const recipientIds = channel?.recipients || [];
                            const currentUser = shelter.flux?.stores?.UserStore?.getCurrentUser();
                            if (currentUser && !recipientIds.includes(currentUser.id)) {
                                recipientIds.push(currentUser.id);
                            }

                            if (recipientIds.length > 0) {
                                const encrypted = await encryptMessage(content, recipientIds);

                                // Switch to file upload
                                const formData = new FormData();
                                const file = new File([new Blob([encrypted], { type: 'text/plain' })], 'message.txt');

                                // Preserve original body properties, but clear content
                                const payload_json = { ...req.body, content: '' };
                                formData.append('payload_json', JSON.stringify(payload_json));
                                formData.append('file', file, 'message.txt');

                                // Replace body and remove content-type for browser to set it
                                req.body = formData;
                                if (req.headers) {
                                    delete req.headers['Content-Type'];
                                }

                            } else {
                                console.warn("PGPCord: No recipients found for encryption (not a DM?).");
                            }
                        }
                    }
                } catch (e) {
                    console.error("PGPCord: Failed to encrypt message and send as file", e);
                }
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
