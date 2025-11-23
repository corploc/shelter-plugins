import { render } from "solid-js/web";
import { createSignal, onMount, Show } from "solid-js";
import EncryptedMessage from "../components/EncryptedMessage";
import { decryptMessage, loadKeyPairFromLocalStorage, getCachedPrivateKey, PassphraseRequiredError, decryptAndCachePrivateKey } from "../lib/crypto";
import { isSecureMode } from "../lib/store";

declare const shelter: any;

const PGP_BLOCK_REGEX = /-----BEGIN PGP MESSAGE-----(.|\n)*-----END PGP MESSAGE-----/;

let unobserve: (() => void) | null = null;

// Cache for message content: MessageID -> { encrypted, decrypted, isFile, channelId, state }
const messageCache = new Map<string, {
    encrypted: string;
    decrypted?: string;
    isFile: boolean;
    channelId: string;
    state: "encrypted" | "decrypted" | "wrong_key" | "passphrase_required";
}>();

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
    const [state, setState] = createSignal<"decrypting" | "decrypted" | "error" | "waiting_for_passphrase" | "wrong_key">("decrypting");
    const [passphrase, setPassphrase] = createSignal("");

    const attemptDecryption = async () => {
        try {
            const decrypted = await decryptMessage(props.encryptedContent);
            // Store in cache
            const cached = messageCache.get(props.messageId);
            if (cached) {
                cached.decrypted = decrypted;
                cached.state = "decrypted";
            }
            // If successful, we want to trigger native rendering
            // We do this by updating the message in the store
            updateMessageContent(props.messageId, props.channelId, decrypted);
            setState("decrypted");
        } catch (err) {
            if (err instanceof PassphraseRequiredError) {
                setState("waiting_for_passphrase");
                const cached = messageCache.get(props.messageId);
                if (cached) cached.state = "passphrase_required";
            } else if (err.name === "WrongKeyError") {
                setState("wrong_key");
                const cached = messageCache.get(props.messageId);
                if (cached) cached.state = "wrong_key";
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

            // If successful, reprocess other messages in the channel to unlock them automatically
            if (state() === "decrypted") {
                reprocessMessages();
            }
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

            <Show when={state() === "wrong_key"}>
                <div style={{ "display": "flex", "flex-direction": "column", "gap": "8px", "color": "var(--text-muted)" }}>
                    <div style={{ "display": "flex", "align-items": "center", "gap": "8px" }}>
                        <span style={{ "font-size": "1.2em" }}>🔑</span>
                        <span style={{ "font-weight": "600" }}>Encrypted with a different key</span>
                    </div>
                    <div style={{ "font-size": "12px" }}>
                        This message cannot be decrypted with your current private key. It may have been encrypted with an old key or for a different user.
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

const applyMessageVisibility = async (messageId: string, channelId: string, encryptedContent: string) => {
    const cached = messageCache.get(messageId);

    const secure = isSecureMode();
    const privateKey = getCachedPrivateKey(); // Check if unlocked

    // If already processed and has a definitive state, handle appropriately
    if (cached) {
        if (cached.state === "decrypted" && cached.decrypted) {
            // Already decrypted, just update
            if (secure) {
                updateMessageContent(messageId, channelId, cached.decrypted);
            } else {
                updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
            }
            return;
        } else if (cached.state === "wrong_key") {
            // Wrong key - show PGP block in secure mode so UI can display error
            if (secure) {
                updateMessageContent(messageId, channelId, encryptedContent);
            } else {
                updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
            }
            return;
        } else if (cached.state === "passphrase_required") {
            // Needs passphrase - show PGP block in secure mode so UI can prompt
            if (secure) {
                updateMessageContent(messageId, channelId, encryptedContent);
            } else {
                updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
            }
            return;
        }
    }

    if (!secure) {
        // Normal Mode: Hide content
        updateMessageContent(messageId, channelId, "🔒 Encrypted Message");
    } else {
        // Secure Mode
        if (privateKey) {
            // Unlocked: Try to decrypt (but only once)
            try {
                const decrypted = await decryptMessage(encryptedContent);
                if (cached) {
                    cached.decrypted = decrypted;
                    cached.state = "decrypted";
                }
                updateMessageContent(messageId, channelId, decrypted);
            } catch (err) {
                if (err.name === "WrongKeyError") {
                    if (cached) cached.state = "wrong_key";
                    // Don't update the message - return to let the UI component show
                    return;
                } else {
                    // For other errors, mark as passphrase_required to avoid retry
                    if (cached) cached.state = "passphrase_required";
                    // Show PGP block for errors (triggers UI injection)
                    updateMessageContent(messageId, channelId, encryptedContent);
                }
            }
        } else {
            // Locked: Show PGP block (which triggers UI injection)
            if (cached) cached.state = "passphrase_required";
            updateMessageContent(messageId, channelId, encryptedContent);
        }
    }
};

export const reprocessMessages = () => {
    console.log("PGPCord: Reprocessing messages...");

    // Clear all cached states except encrypted content
    // This forces re-evaluation based on current mode
    messageCache.forEach((data, messageId) => {
        // Reset state to encrypted to allow re-processing
        data.state = "encrypted";
        // Clear decrypted content to force fresh decryption
        delete data.decrypted;

        applyMessageVisibility(messageId, data.channelId, data.encrypted);
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
        messageCache.set(messageId, { encrypted: text, isFile: false, channelId, state: "encrypted" });
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

    // Check if we need to show UI based on cached state
    const cached = messageCache.get(messageId);
    const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();

    // If message is in wrong_key state, show that UI
    if (cached?.state === "wrong_key") {
        element.setAttribute("data-pgpcord-injected", "true");
        element.innerHTML = "";
        const container = document.createElement("div");
        element.appendChild(container);
        render(() => <DecryptedMessageContainer encryptedContent={text} messageId={messageId} channelId={channelId} />, container);
        return;
    }

    // Only show password UI if key is locked AND state is passphrase_required
    const privateKey = getCachedPrivateKey();
    if (!privateKey && cached?.state === "passphrase_required") {
        element.setAttribute("data-pgpcord-injected", "true");
        element.innerHTML = "";
        const container = document.createElement("div");
        element.appendChild(container);
        render(() => <DecryptedMessageContainer encryptedContent={text} messageId={messageId} channelId={channelId} />, container);
    }
};

const handleEncryptedFile = async (attachmentElement: Element, messageId: string) => {
    // Check if already handled
    if (messageCache.has(messageId)) {
        const data = messageCache.get(messageId)!;
        applyMessageVisibility(messageId, data.channelId, data.encrypted);
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
            messageCache.set(messageId, { encrypted: textContent, isFile: true, channelId, state: "encrypted" });
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

let uninterceptEdit: (() => void) | null = null;

export const patchMessageContent = () => {
    // Observe chat messages directly to catch those with only attachments
    unobserve = observeDom("[id^='chat-messages-']", (messageElement) => {
        let messageId = messageElement.id.replace('chat-messages-', '');

        // Handle potential ChannelID-MessageID format
        if (messageId.includes('-')) {
            const parts = messageId.split('-');
            messageId = parts[parts.length - 1]; // Return the last part (MessageID)
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

    // Intercept message editing to prevent editing of encrypted messages
    // This prevents the security leak where decrypted plaintext would show in the edit box
    if (shelter.flux?.dispatcher) {
        const originalDispatch = shelter.flux.dispatcher.dispatch.bind(shelter.flux.dispatcher);

        shelter.flux.dispatcher.dispatch = (payload: any) => {
            // Intercept START_EDIT_MESSAGE actions
            if (payload.type === "MESSAGE_START_EDIT") {
                const messageId = payload.messageId;
                const channelId = payload.channelId;

                // Check if this message is in our encrypted cache
                if (messageCache.has(messageId)) {
                    // Block the edit and show a notification
                    console.log("PGPCord: Blocked edit attempt on encrypted message", messageId);

                    // Show a toast notification if available
                    if (shelter.ui?.showToast) {
                        shelter.ui.showToast({
                            title: "Cannot Edit Encrypted Message",
                            content: "Encrypted messages cannot be edited for security reasons. Please delete and send a new message instead.",
                            duration: 5000,
                        });
                    } else {
                        // Fallback: alert
                        alert("Cannot edit encrypted messages for security reasons.\nPlease delete and send a new message instead.");
                    }

                    // Do NOT dispatch the edit action
                    return;
                }
            }

            // For all other actions, proceed normally
            return originalDispatch(payload);
        };

        // Store cleanup function
        uninterceptEdit = () => {
            if (shelter.flux?.dispatcher) {
                shelter.flux.dispatcher.dispatch = originalDispatch;
            }
        };
    } else {
        console.warn("PGPCord: shelter.flux.dispatcher not found. Message edit blocking will not work.");
    }
};

export const unpatchMessage = () => {
    if (unobserve) unobserve();
    if (uninterceptEdit) uninterceptEdit();
};
