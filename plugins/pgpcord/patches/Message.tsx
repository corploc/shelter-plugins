import { render } from "solid-js/web";
import { createSignal, onMount, Show } from "solid-js";
import { decryptMessage, getCachedPrivateKey, PassphraseRequiredError, decryptAndCachePrivateKey } from "../lib/crypto";
import { isSecureMode } from "../lib/store";

declare const shelter: any;

const PGP_BLOCK_REGEX = /-----BEGIN PGP MESSAGE-----(.|\n)*-----END PGP MESSAGE-----/;

let unobserve: (() => void) | null = null;

// Type definition for message data
interface MessageData {
    encrypted: string;
    decrypted?: string;
    isFile: boolean;
    state: "encrypted" | "decrypted" | "wrong_key" | "passphrase_required";
}

// Store: ChannelID -> Map<MessageID, MessageData>
const channelMessageStore = new Map<string, Map<string, MessageData>>();

// Helper to update message content via Flux
const updateMessageContent = (messageId: string, channelId: string, newContent: string) => {
    // Safeguard: Ensure messageId is clean
    if (messageId.includes('-')) {
        const parts = messageId.split('-');
        messageId = parts[parts.length - 1];
    }

    const existingMessage = shelter.flux.stores.MessageStore.getMessage(channelId, messageId);

    if (!existingMessage || !existingMessage.id || !existingMessage.channel_id) {
        // This is common when switching channels or scrolling, so we don't always warn
        return;
    }

    shelter.flux.dispatcher.dispatch({
        type: "MESSAGE_UPDATE",
        message: {
            id: messageId,
            channel_id: channelId,
            content: newContent,
            attachments: [], // Clear attachments as we are replacing with text
            type: existingMessage.type,
            flags: existingMessage.flags,
            // We send a minimal update to avoid confusing other stores (like UserStore)
            // that might expect raw API data structures or specific fields.
            // MessageStore should merge this into the existing message.
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
            const channelStore = channelMessageStore.get(props.channelId);
            if (channelStore) {
                const cached = channelStore.get(props.messageId);
                if (cached) {
                    cached.decrypted = decrypted;
                    cached.state = "decrypted";
                }
            }

            // If successful, we want to trigger native rendering
            updateMessageContent(props.messageId, props.channelId, decrypted);
            setContent(decrypted); // Set content for local display as fallback
            setState("decrypted");
        } catch (err) {
            const channelStore = channelMessageStore.get(props.channelId);
            const cached = channelStore?.get(props.messageId);

            if (err instanceof PassphraseRequiredError) {
                setState("waiting_for_passphrase");
                if (cached) cached.state = "passphrase_required";
            } else if (err.name === "WrongKeyError") {
                setState("wrong_key");
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
            // We assume success if no error was thrown above
            reprocessMessages(props.channelId);
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
            <Show when={state() === "decrypted"}>
                <div style={{ "white-space": "pre-wrap", "word-break": "break-word", "color": "var(--text-normal)" }}>
                    {content()}
                </div>
            </Show>

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

// Type definition for message data
interface MessageData {
    encrypted: string;
    decrypted?: string;
    isFile: boolean;
    state: "encrypted" | "decrypted" | "wrong_key" | "passphrase_required";
    cleanup?: () => void;
}

const applyMessageVisibility = async (messageId: string, channelId: string, encryptedContent: string) => {
    const channelStore = channelMessageStore.get(channelId);
    const cached = channelStore?.get(messageId);

    // Cleanup previous injection if it exists
    if (cached?.cleanup) {
        try {
            cached.cleanup();
        } catch (e) {
            console.warn("PGPCord: Failed to cleanup injected component", e);
        }
        cached.cleanup = undefined;
    }

    const secure = isSecureMode();
    const privateKey = getCachedPrivateKey(); // Check if unlocked

    // Sanitize PGP block: ensure blank line after header
    const sanitizedContent = encryptedContent.replace(
        /(-----BEGIN PGP MESSAGE-----)([^\n])/,
        '$1\n\n$2'
    ).replace(
        /(-----BEGIN PGP MESSAGE-----\n)(?!Version: )([^\n])/,
        '$1\n$2'
    );
    // Note: The regex above is a basic attempt. A better way might be to ensure standard formatting.
    // OpenPGP.js is usually strict. Let's try to just ensure there is a blank line before the body.
    // Actually, let's trust the regex extraction but maybe trim whitespace.

    // If already processed and has a definitive state, handle appropriately
    if (cached) {
        // If we have a private key now, and state was passphrase_required, we should retry!
        if (privateKey && cached.state === "passphrase_required") {
            // Fall through to decryption logic
        } else if (cached.state === "decrypted" && cached.decrypted) {
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
            // Needs passphrase (and we still don't have key) - show PGP block in secure mode so UI can prompt
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
                const decrypted = await decryptMessage(sanitizedContent); // Use original content, let crypto lib handle parsing if possible, or use sanitized if needed.
                // Actually, the error "Mandatory blank line missing" is specific.
                // Let's try to fix it by ensuring double newline after Version header if present, or just after BEGIN if not.

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


export const reprocessMessages = (targetChannelId?: string) => {
    console.log("PGPCord: Reprocessing messages...", targetChannelId ? `for channel ${targetChannelId}` : "all channels");

    if (targetChannelId) {
        const channelStore = channelMessageStore.get(targetChannelId);
        if (channelStore) {
            channelStore.forEach((data, messageId) => {
                // Reset state to encrypted to allow re-processing
                // This ensures that if we just unlocked, we try to decrypt everything that was waiting
                if (data.state === "passphrase_required" || data.state === "encrypted") {
                    data.state = "encrypted";
                    delete data.decrypted;
                }

                applyMessageVisibility(messageId, targetChannelId, data.encrypted);
            });
        }
    } else {
        // Reprocess all channels (e.g. on global lock toggle)
        channelMessageStore.forEach((channelStore, channelId) => {
            channelStore.forEach((data, messageId) => {
                // Reset state here too
                if (data.state === "passphrase_required" || data.state === "encrypted") {
                    data.state = "encrypted";
                    delete data.decrypted;
                }
                applyMessageVisibility(messageId, channelId, data.encrypted);
            });
        });
    }
};

const handleEncryptedText = (element: Element, text: string) => {
    // Avoid double injection if we are already handling this element
    if (element.getAttribute("data-pgpcord-injected") === "true") return;

    const messageId = getMessageId(element);
    if (!messageId) return;

    const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
    if (!channelId) return;

    // Initialize store for this channel if needed
    if (!channelMessageStore.has(channelId)) {
        channelMessageStore.set(channelId, new Map());
    }
    const channelStore = channelMessageStore.get(channelId)!;

    // Cache if new
    if (!channelStore.has(messageId)) {
        channelStore.set(messageId, { encrypted: text, isFile: false, state: "encrypted" });
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
    const cached = channelStore.get(messageId);

    // Helper to inject and store cleanup
    const inject = (component: any) => {
        element.setAttribute("data-pgpcord-injected", "true");
        element.innerHTML = "";
        const container = document.createElement("div");
        element.appendChild(container);
        const dispose = render(component, container);
        if (cached) cached.cleanup = dispose;
    };

    // If message is in wrong_key state, show that UI
    if (cached?.state === "wrong_key") {
        inject(() => <DecryptedMessageContainer encryptedContent={text} messageId={messageId} channelId={channelId} />);
        return;
    }

    // Only show password UI if key is locked AND state is passphrase_required
    const privateKey = getCachedPrivateKey();
    if (!privateKey && cached?.state === "passphrase_required") {
        inject(() => <DecryptedMessageContainer encryptedContent={text} messageId={messageId} channelId={channelId} />);
    }
};

const handleEncryptedFile = async (attachmentElement: Element, messageId: string) => {
    const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
    if (!channelId) return;

    // Initialize store for this channel if needed
    if (!channelMessageStore.has(channelId)) {
        channelMessageStore.set(channelId, new Map());
    }
    const channelStore = channelMessageStore.get(channelId)!;

    // Check if already handled
    if (channelStore.has(messageId)) {
        const data = channelStore.get(messageId)!;
        applyMessageVisibility(messageId, channelId, data.encrypted);
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
            channelStore.set(messageId, { encrypted: textContent, isFile: true, state: "encrypted" });
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

const injectLockIcon = (messageElement: Element) => {
    const header = messageElement.querySelector("h3"); // Message header usually contains username
    if (!header) return;

    // Check if already injected
    if (header.querySelector(".pgpcord-lock-icon")) return;

    // Try to find the username element to insert before
    // Discord structure: h3 > span.username...
    const username = header.querySelector("span[class*='username']");
    if (!username) return;

    const lockIcon = document.createElement("span");
    lockIcon.className = "pgpcord-lock-icon";
    lockIcon.innerHTML = "🔒 ";
    lockIcon.style.fontSize = "0.9em";
    lockIcon.style.marginRight = "4px";
    lockIcon.style.cursor = "help";
    lockIcon.title = "End-to-end Encrypted";

    // Insert before username
    if (username.parentNode) {
        username.parentNode.insertBefore(lockIcon, username);
    }
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
                injectLockIcon(messageElement);
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
                injectLockIcon(messageElement);
            }
        });

        // 3. Check if this message is known to be encrypted (e.g. already decrypted)
        // and ensure the lock icon is present
        const channelId = shelter.flux.stores.SelectedChannelStore.getChannelId();
        if (channelId) {
            const channelStore = channelMessageStore.get(channelId);
            if (channelStore && channelStore.has(messageId)) {
                injectLockIcon(messageElement);
            }
        }
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
                const channelStore = channelMessageStore.get(channelId);
                if (channelStore && channelStore.has(messageId)) {
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
