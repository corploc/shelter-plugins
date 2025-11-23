import { render } from "solid-js/web";
import { createSignal, onMount, Show } from "solid-js";
import EncryptedMessage from "../components/EncryptedMessage";
import { decryptMessage, loadKeyPairFromLocalStorage, getCachedPrivateKey, PassphraseRequiredError, decryptAndCachePrivateKey } from "../lib/crypto";
import { isSecureMode } from "../lib/store";

declare const shelter: any;

const PGP_BLOCK_REGEX = /-----BEGIN PGP MESSAGE-----(.|\n)*-----END PGP MESSAGE-----/;

let unobserve: (() => void) | null = null;

// Cache for original message content: MessageID -> { content, isFile, channelId }
const messageCache = new Map<string, { content: string; isFile: boolean; channelId: string }>();

// Helper to update message content via Flux
const updateMessageContent = (messageId: string, channelId: string, newContent: string) => {
    // Safeguard: Ensure messageId is clean
    if (messageId.includes('-')) {
        const parts = messageId.split('-');
        messageId = parts[parts.length - 1];
    }

    const existingMessage = shelter.flux.stores.MessageStore.getMessage(channelId, messageId);

    if (!existingMessage) {
        console.warn("PGPCord: Could not find existing message to update", messageId, "in channel", channelId);
        return;
    }

    shelter.flux.dispatcher.dispatch({
        type: "MESSAGE_UPDATE",
        message: {
            ...existingMessage,
            content: newContent,
            attachments: [], // Clear attachments as we are replacing with text
        }
    });
};

const getMessageId = (element: Element): string | null => {
    const messageElement = element.closest("[id^='chat-messages-']");
    if (!messageElement) return null;
    const rawId = messageElement.id.replace('chat-messages-', '');

    // Handle potential ChannelID-MessageID format
    if (rawId.includes('-')) {
        const parts = rawId.split('-');
        return parts[parts.length - 1]; // Return the last part (MessageID)
    }
    return rawId;
};

const DecryptedMessageContainer = (props: { encryptedContent: string, messageId: string, channelId: string }) => {
    const [content, setContent] = createSignal("");
    const [state, setState] = createSignal<"decrypting" | "decrypted" | "error" | "waiting_for_passphrase">("decrypting");
    const [passphrase, setPassphrase] = createSignal("");

    const attemptDecryption = async () => {
        try {
            const decrypted = await decryptMessage(props.encryptedContent);
            // If successful, we want to trigger native rendering
            // We do this by updating the message in the store
            updateMessageContent(props.messageId, props.channelId, decrypted);
            setState("decrypted");
        } catch (err) {
            if (err instanceof PassphraseRequiredError) {
                setState("waiting_for_passphrase");
            } else {
                console.error("PGPCord: Decryption failed", err);
                setState("error");
                const errorMessage = err instanceof Error ? err.message : "Unknown error";
                setContent(`Decryption failed: ${errorMessage}`);
            }
        }
    };

    const handlePassphraseSubmit = async (e: Event) => {
        e.preventDefault();
        setState("decrypting");
        try {
            await decryptAndCachePrivateKey(passphrase());
            // Private key is now cached, re-attempt decryption
            await attemptDecryption();

            // Also reprocess other messages in the channel to unlock them automatically
            reprocessMessages();
        } catch (err) {
            console.error("PGPCord: Passphrase incorrect or decryption failed", err);
            setState("error");
            setContent("Incorrect passphrase or decryption failed.");
        }
    };

    onMount(() => {
        attemptDecryption();
    });

    return (
        <div style={{
            "background-color": "var(--background-secondary)",
            "border-radius": "8px",
            "padding": "12px",
            "margin-top": "8px",
            "border": "1px solid var(--background-modifier-accent)"
        }}>
            <Show when={state() === "waiting_for_passphrase"}>
                <div style={{ "display": "flex", "flex-direction": "column", "gap": "8px" }}>
                    <div style={{ "display": "flex", "align-items": "center", "gap": "8px", "color": "var(--header-secondary)" }}>
                        <span style={{ "font-size": "1.2em" }}>🔒</span>
                        <span style={{ "font-weight": "600" }}>PGP Encrypted Message</span>
                    </div>
                    <form onSubmit={handlePassphraseSubmit} style={{ "display": "flex", "gap": "8px" }}>
                        <input
                            type="password"
                            placeholder="Enter passphrase to unlock key..."
                            value={passphrase()}
                            onInput={(e) => setPassphrase(e.currentTarget.value)}
                            style={{
                                "flex-grow": "1",
                                "padding": "8px 12px",
                                "border-radius": "4px",
                                "border": "1px solid var(--background-tertiary)",
                                "background-color": "var(--background-tertiary)",
                                "color": "var(--text-normal)",
                                "font-size": "14px"
                            }}
                        />
                        <button type="submit" style={{
                            "padding": "8px 16px",
                            "border-radius": "4px",
                            "border": "none",
                            "background-color": "var(--brand-experiment)",
                            "color": "var(--interactive-active)",
                            "font-weight": "500",
                            "cursor": "pointer",
                            "transition": "background-color 0.17s ease"
                        }}>
                            Unlock
                        </button>
                    </form>
                    <div style={{ "font-size": "12px", "color": "var(--text-muted)" }}>
                        Your private key is locked. Enter your passphrase to decrypt this and other messages.
                    </div>
                </div>
            </Show>

            <Show when={state() === "decrypting"}>
                <div style={{ "display": "flex", "align-items": "center", "gap": "8px", "color": "var(--text-normal)" }}>
                    <div class="spinner-dots" style={{ "width": "20px", "height": "20px", "border": "2px solid var(--text-muted)", "border-top-color": "var(--brand-experiment)", "border-radius": "50%", "animation": "spin 1s linear infinite" }}></div>
                    <span>Decrypting message...</span>
                </div>
            </Show>

            <Show when={state() === "error"}>
                <div style={{ "color": "var(--text-danger)", "display": "flex", "flex-direction": "column", "gap": "4px" }}>
                    <div style={{ "font-weight": "bold", "display": "flex", "align-items": "center", "gap": "6px" }}>
                        <span>⚠️</span>
                        <span>Error Decrypting Message</span>
                    </div>
                    <div style={{ "font-family": "monospace", "background-color": "var(--background-tertiary)", "padding": "8px", "border-radius": "4px", "font-size": "12px" }}>
                        {content()}
                    </div>
                    <button
                        onClick={() => setState("waiting_for_passphrase")}
                        style={{
                            "margin-top": "4px",
                            "background": "transparent",
                            "border": "none",
                            "color": "var(--text-link)",
                            "cursor": "pointer",
                            "text-align": "left",
                            "padding": "0"
                        }}
                    >
                        Try again
                    </button>
                </div>
            </Show>
        </div>
    );
};

const applyMessageVisibility = (messageId: string, channelId: string, originalContent: string) => {
    const secure = isSecureMode();
    const privateKey = getCachedPrivateKey(); // Check if unlocked

    if (!secure) {
        // Normal Mode: Hide content
        updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
    } else {
        // Secure Mode
        if (privateKey) {
            // Unlocked: Decrypt and show natively
            decryptMessage(originalContent).then(decrypted => {
                updateMessageContent(messageId, channelId, decrypted);
            }).catch(err => {
                // If decryption fails (e.g. wrong key), revert to PGP block so UI can show error/prompt
                updateMessageContent(messageId, channelId, originalContent);
            });
        } else {
            // Locked: Show PGP block (which triggers UI injection)
            updateMessageContent(messageId, channelId, originalContent);
        }
    }
};

export const reprocessMessages = () => {
    console.log("PGPCord: Reprocessing messages...");
    messageCache.forEach((data, messageId) => {
        applyMessageVisibility(messageId, data.channelId, data.content);
    });
};

const handleEncryptedText = (element: Element, text: string) => {
    // Avoid double injection if we are already handling this element
    if (element.getAttribute("data-pgpcord-injected") === "true") return;

    const messageId = getMessageId(element);
    if (!messageId) return;

    // Cache if new
    if (!messageCache.has(messageId)) {
        const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
        messageCache.set(messageId, { content: text, isFile: false, channelId });
        // Initial visibility check
        applyMessageVisibility(messageId, channelId, text);
        // If we just dispatched an update, this element might be removed/replaced.
        // So we shouldn't do anything else here if we are hiding it.
        if (!isSecureMode()) return;
    }

    // If we are here, it means we are in Secure Mode and the content is the PGP block.
    // We need to inject the UI (Password Prompt) if locked.
    // If unlocked, applyMessageVisibility would have replaced it with decrypted text,
    // so we wouldn't be seeing the PGP block (unless decryption failed or race condition).

    // Check if we need to show password UI
    const privateKey = getCachedPrivateKey();
    if (!privateKey) {
        element.setAttribute("data-pgpcord-injected", "true");
        element.innerHTML = "";
        const container = document.createElement("div");
        element.appendChild(container);
        // We need channelId here too. We can get it from cache or store.
        const channelId = messageCache.get(messageId)?.channelId || shelter.flux.stores.SelectedChannelStore.getChannelId();
        render(() => <DecryptedMessageContainer encryptedContent={text} messageId={messageId} channelId={channelId} />, container);
    }
};

const handleEncryptedFile = async (attachmentElement: Element, messageId: string) => {
    // Check if already handled
    if (messageCache.has(messageId)) {
        const data = messageCache.get(messageId)!;
        applyMessageVisibility(messageId, data.channelId, data.content);
        // Ensure attachment is hidden if we have cached content
        (attachmentElement as HTMLElement).style.display = "none";
        return;
    }

    // Mark as processing to prevent double fetch
    if (attachmentElement.getAttribute("data-pgpcord-processing") === "true") return;
    attachmentElement.setAttribute("data-pgpcord-processing", "true");

    let anchor = attachmentElement.querySelector<HTMLAnchorElement>("a[href]");
    if (!anchor) anchor = attachmentElement.closest<HTMLAnchorElement>("a[href]");

    // Fallback search
    if (!anchor && attachmentElement.parentElement) {
        anchor = attachmentElement.parentElement.querySelector<HTMLAnchorElement>("a[href]");
        if (!anchor && attachmentElement.parentElement.parentElement) {
            anchor = attachmentElement.parentElement.parentElement.querySelector<HTMLAnchorElement>("a[href]");
        }
    }

    if (!anchor) {
        console.warn("PGPCord: Could not find download link for message.txt attachment", attachmentElement);
        return;
    }

    try {
        // Hide attachment immediately to indicate processing
        (attachmentElement as HTMLElement).style.display = "none";

        const url = anchor.href;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch attachment");

        const textContent = await response.text();
        if (PGP_BLOCK_REGEX.test(textContent)) {
            // Cache it
            const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
            messageCache.set(messageId, { content: textContent, isFile: true, channelId });
            // Apply visibility (this updates the store and should remove attachment from render)
            applyMessageVisibility(messageId, channelId, textContent);
        } else {
            // Not a PGP message, unhide
            (attachmentElement as HTMLElement).style.display = "";
        }
    } catch (e) {
        console.error("PGPCord: Failed to process encrypted file.", e);
        // Unhide on error
        (attachmentElement as HTMLElement).style.display = "";
    } finally {
        attachmentElement.removeAttribute("data-pgpcord-processing");
    }
};

// Helper to observe DOM
const observeDom = (selector: string, callback: (el: Element) => void) => {
    if (shelter.observeDom) {
        return shelter.observeDom(selector, callback);
    }

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

export const patchMessageContent = () => {
    // Observe chat messages directly to catch those with only attachments
    unobserve = observeDom("[id^='chat-messages-']", (messageElement) => {
        let messageId = messageElement.id.replace('chat-messages-', '');

        // Handle potential ChannelID-MessageID format
        if (messageId.includes('-')) {
            const parts = messageId.split('-');
            messageId = parts[parts.length - 1];
        }

        if (!messageId) return;

        // 1. Check for PGP block in text content
        // We look for the message content div inside
        const contentElement = messageElement.querySelector("[id^='message-content-']");
        if (contentElement) {
            const text = contentElement.textContent;
            const match = text && text.match(PGP_BLOCK_REGEX);
            if (match) {
                handleEncryptedText(contentElement, match[0]);
                return;
            }
        }

        // 2. Check for message.txt attachment
        const attachments = messageElement.querySelectorAll("[class*='attachment']");
        attachments.forEach(attachment => {
            const textContent = attachment.textContent || "";
            const isMessageTxt = textContent.includes("message.txt") || attachment.querySelector("a[href*='message.txt']");

            if (isMessageTxt) {
                handleEncryptedFile(attachment, messageId);
            }
        });
    });
};

export const unpatchMessage = () => {
    if (unobserve) unobserve();
};
