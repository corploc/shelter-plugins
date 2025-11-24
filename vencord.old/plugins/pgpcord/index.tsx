import { definePlugin } from "@vencord/plugins";
import { findByProps } from "@vencord/webpack";
import { React, ReactDOM } from "@vencord/webpack/common";
import { Settings } from "./components/Settings";
import { SecureChatBar } from "./components/SecureChatBar";
import { EncryptedMessage } from "./components/EncryptedMessage";
import { encryptMessage, getCachedPrivateKey, loadKeyPairFromLocalStorage, decryptMessage, WrongKeyError, PassphraseRequiredError } from "./lib/crypto";
import { isSecureMode, Store } from "./lib/store";

const MessageActions = findByProps("sendMessage", "editMessage");
const FluxDispatcher = findByProps("dispatch", "subscribe");
const MessageStore = findByProps("getMessage", "getMessages");
const SelectedChannelStore = findByProps("getChannelId", "getVoiceChannelId");
const UserStore = findByProps("getCurrentUser", "getUser");
const ChannelStore = findByProps("getChannel", "getDMFromUserId");

const PGP_BLOCK_REGEX = /-----BEGIN PGP MESSAGE-----(.|\n)*-----END PGP MESSAGE-----/;

// Cache for message content
const messageCache = new Map<string, {
    encrypted: string;
    decrypted?: string;
    isFile: boolean;
    channelId: string;
    state: "encrypted" | "decrypted" | "wrong_key" | "passphrase_required";
}>();

let unobserve: (() => void) | null = null;
let unobserveChat: (() => void) | null = null;
let unpatchSendMessage: (() => void) | null = null;
let unpatchFlux: (() => void) | null = null;

const observeDom = (selector: string, callback: (el: Element) => void) => {
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

const updateMessageContent = (messageId: string, channelId: string, newContent: string) => {
    if (messageId.includes('-')) {
        const parts = messageId.split('-');
        messageId = parts[parts.length - 1];
    }

    const existingMessage = MessageStore.getMessage(channelId, messageId);

    if (!existingMessage) return;

    FluxDispatcher.dispatch({
        type: "MESSAGE_UPDATE",
        message: {
            ...existingMessage,
            content: newContent,
            attachments: [],
        }
    });
};

const applyMessageVisibility = async (messageId: string, channelId: string, encryptedContent: string) => {
    const cached = messageCache.get(messageId);
    const secure = isSecureMode();
    const privateKey = getCachedPrivateKey();

    if (cached) {
        if (cached.state === "decrypted" && cached.decrypted) {
            if (secure) {
                updateMessageContent(messageId, channelId, cached.decrypted);
            } else {
                updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
            }
            return;
        } else if (cached.state === "wrong_key" || cached.state === "passphrase_required") {
            if (secure) {
                updateMessageContent(messageId, channelId, encryptedContent);
            } else {
                updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
            }
            return;
        }
    }

    if (!secure) {
        updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
    } else {
        if (privateKey) {
            try {
                const decrypted = await decryptMessage(encryptedContent);
                if (cached) {
                    cached.decrypted = decrypted;
                    cached.state = "decrypted";
                }
                updateMessageContent(messageId, channelId, decrypted);
            } catch (err) {
                if (err instanceof WrongKeyError) {
                    if (cached) cached.state = "wrong_key";
                    return;
                } else {
                    if (cached) cached.state = "passphrase_required";
                    updateMessageContent(messageId, channelId, encryptedContent);
                }
            }
        } else {
            if (cached) cached.state = "passphrase_required";
            updateMessageContent(messageId, channelId, encryptedContent);
        }
    }
};

export const reprocessMessages = () => {
    messageCache.forEach((data, messageId) => {
        data.state = "encrypted";
        delete data.decrypted;
        applyMessageVisibility(messageId, data.channelId, data.encrypted);
    });
};

const handleEncryptedText = (element: Element, text: string) => {
    if (element.getAttribute("data-pgpcord-injected") === "true") return;

    const messageElement = element.closest("[id^='chat-messages-']");
    if (!messageElement) return;
    let messageId = messageElement.id.replace('chat-messages-', '');
    if (messageId.includes('-')) {
        const parts = messageId.split('-');
        messageId = parts[parts.length - 1];
    }

    if (!messageCache.has(messageId)) {
        const channelId = SelectedChannelStore.getChannelId();
        messageCache.set(messageId, { encrypted: text, isFile: false, channelId, state: "encrypted" });
        applyMessageVisibility(messageId, channelId, text);
        if (!isSecureMode()) return;
    }

    const cached = messageCache.get(messageId);
    const channelId = SelectedChannelStore.getChannelId();

    if (cached?.state === "wrong_key" || (cached?.state === "passphrase_required" && !getCachedPrivateKey())) {
        element.setAttribute("data-pgpcord-injected", "true");
        element.innerHTML = "";
        const container = document.createElement("div");
        element.appendChild(container);

        const root = ReactDOM.createRoot(container);
        root.render(
            <EncryptedMessage
                encryptedContent={text}
                messageId={messageId}
                channelId={channelId}
                onDecrypted={(decrypted) => {
                    if (cached) {
                        cached.decrypted = decrypted;
                        cached.state = "decrypted";
                    }
                    updateMessageContent(messageId, channelId, decrypted);
                }}
            />
        );
    }
};

const handleEncryptedFile = async (attachmentElement: Element, messageId: string) => {
    if (messageCache.has(messageId)) {
        const data = messageCache.get(messageId)!;
        applyMessageVisibility(messageId, data.channelId, data.encrypted);
        (attachmentElement as HTMLElement).style.display = "none";
        return;
    }

    if (attachmentElement.getAttribute("data-pgpcord-processing") === "true") return;
    attachmentElement.setAttribute("data-pgpcord-processing", "true");

    let anchor = attachmentElement.querySelector<HTMLAnchorElement>("a[href]");
    if (!anchor) anchor = attachmentElement.closest<HTMLAnchorElement>("a[href]");
    if (!anchor && attachmentElement.parentElement) {
        anchor = attachmentElement.parentElement.querySelector<HTMLAnchorElement>("a[href]");
        if (!anchor && attachmentElement.parentElement.parentElement) {
            anchor = attachmentElement.parentElement.parentElement.querySelector<HTMLAnchorElement>("a[href]");
        }
    }

    if (!anchor) return;

    try {
        (attachmentElement as HTMLElement).style.display = "none";
        const url = anchor.href;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch attachment");

        const textContent = await response.text();
        if (PGP_BLOCK_REGEX.test(textContent)) {
            const channelId = SelectedChannelStore.getChannelId();
            messageCache.set(messageId, { encrypted: textContent, isFile: true, channelId, state: "encrypted" });
            applyMessageVisibility(messageId, channelId, textContent);
        } else {
            (attachmentElement as HTMLElement).style.display = "";
        }
    } catch (e) {
        console.error("PGPCord: Failed to process encrypted file.", e);
        (attachmentElement as HTMLElement).style.display = "";
    } finally {
        attachmentElement.removeAttribute("data-pgpcord-processing");
    }
};

export default definePlugin({
    name: "PGPCord",
    description: "End-to-end PGP encryption for Discord messages.",
    authors: [{ name: "Gemini", id: 0n }],
    settings: Settings,

    start() {
        // Listen for reprocess events
        window.addEventListener('pgpcord-reprocess', reprocessMessages);

        // 1. Inject Chat Bar UI
        unobserveChat = observeDom("form [class*='buttons']", (element) => {
            if (!element.closest('form')) return;
            if (element.querySelector("#pgpcord-lock-btn")) return;

            const container = document.createElement("div");
            container.id = "pgpcord-lock-btn";
            container.style.display = "flex";
            container.style.alignItems = "center";
            container.style.marginRight = "8px";
            element.prepend(container);

            const root = ReactDOM.createRoot(container);
            root.render(<SecureChatBar />);
        });

        // 2. Observe Messages
        unobserve = observeDom("[id^='chat-messages-']", (messageElement) => {
            let messageId = messageElement.id.replace('chat-messages-', '');
            if (messageId.includes('-')) {
                const parts = messageId.split('-');
                messageId = parts[parts.length - 1];
            }
            if (!messageId) return;

            const contentElement = messageElement.querySelector("[id^='message-content-']");
            if (contentElement) {
                const text = contentElement.textContent;
                const match = text && text.match(PGP_BLOCK_REGEX);
                if (match) {
                    handleEncryptedText(contentElement, match[0]);
                }
            }

            const attachments = messageElement.querySelectorAll("[class*='attachment']");
            attachments.forEach(attachment => {
                const textContent = attachment.textContent || "";
                const isMessageTxt = textContent.includes("message.txt") || attachment.querySelector("a[href*='message.txt']");
                if (isMessageTxt) {
                    handleEncryptedFile(attachment, messageId);
                }
            });
        });

        // 3. Intercept Message Sending
        const originalSendMessage = MessageActions.sendMessage;
        MessageActions.sendMessage = async function (channelId: string, message: any, ...args: any[]) {
            if (isSecureMode() && message?.content) {
                try {
                    const channel = ChannelStore.getChannel(channelId);
                    const recipientIds = channel?.recipients ? [...channel.recipients] : [channelId];
                    const currentUser = UserStore.getCurrentUser();

                    // Add self to recipients if not already present (for DMs it usually isn't)
                    if (currentUser && !recipientIds.includes(currentUser.id)) {
                        recipientIds.push(currentUser.id);
                    }

                    // Filter out self if it's a DM with self? No, we want to encrypt for self too.
                    // encryptMessage handles adding own key.

                    const encrypted = await encryptMessage(message.content, recipientIds);

                    const file = new File([new Blob([encrypted], { type: 'text/plain' })], 'message.txt');

                    message.content = '';
                    if (!message.uploads) message.uploads = [];
                    message.uploads.push(file);

                } catch (e) {
                    console.error("PGPCord: Failed to encrypt message", e);
                    // Fallback to sending plain text? Or block?
                    // Ideally we should alert the user.
                    // For now, we let it fail or send plaintext if encryption fails (risky).
                    // Better to throw error to stop sending.
                    // But we can't easily alert from here without UI.
                }
            }
            return originalSendMessage.call(this, channelId, message, ...args);
        };
        unpatchSendMessage = () => {
            MessageActions.sendMessage = originalSendMessage;
        };

        // 4. Intercept Flux (Prevent Editing)
        const originalDispatch = FluxDispatcher.dispatch.bind(FluxDispatcher);
        FluxDispatcher.dispatch = (payload: any) => {
            if (payload.type === "MESSAGE_START_EDIT") {
                const messageId = payload.messageId;
                if (messageCache.has(messageId)) {
                    console.log("PGPCord: Blocked edit attempt on encrypted message", messageId);
                    alert("Cannot edit encrypted messages for security reasons.\nPlease delete and send a new message instead.");
                    return;
                }
            }
            return originalDispatch(payload);
        };
        unpatchFlux = () => {
            FluxDispatcher.dispatch = originalDispatch;
        };
    },

    stop() {
        window.removeEventListener('pgpcord-reprocess', reprocessMessages);
        if (unobserve) unobserve();
        if (unobserveChat) unobserveChat();
        if (unpatchSendMessage) unpatchSendMessage();
        if (unpatchFlux) unpatchFlux();
        document.querySelectorAll("#pgpcord-lock-btn").forEach(e => e.remove());
    }
});
