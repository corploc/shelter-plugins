import { render } from "solid-js/web";
import { createSignal, onMount, Show } from "solid-js";
import EncryptedMessage from "../components/EncryptedMessage";
import { decryptMessage } from "../lib/crypto";

declare const shelter: any;

const PGP_BLOCK_REGEX = /-----BEGIN PGP MESSAGE-----(.|\n)*-----END PGP MESSAGE-----/;

let unobserve: (() => void) | null = null;

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

import { decryptAndCachePrivateKey, loadKeyPairFromLocalStorage, PassphraseRequiredError } from "../lib/crypto";

const DecryptedMessageContainer = (props: { encryptedContent: string }) => {
    const [content, setContent] = createSignal("");
    const [state, setState] = createSignal<"decrypting" | "decrypted" | "error" | "waiting_for_passphrase">("decrypting");
    const [passphrase, setPassphrase] = createSignal("");

    const attemptDecryption = async () => {
        try {
            const decrypted = await decryptMessage(props.encryptedContent);
            setContent(decrypted);
            setState("decrypted");
        } catch (err) {
            if (err instanceof PassphraseRequiredError) {
                setState("waiting_for_passphrase");
            } else {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                setContent(errorMessage);
                setState("error");
                console.error("PGPCord: Failed to decrypt message:", err);
            }
        }
    };

    onMount(() => {
        attemptDecryption();
    });

    const handleDecrypt = async () => {
        try {
            const keyPair = loadKeyPairFromLocalStorage();
            if (!keyPair) throw new Error("No key pair found.");

            await decryptAndCachePrivateKey(keyPair.privateKey, passphrase());
            // Retry decryption
            setState("decrypting");
            await attemptDecryption();
        } catch (e) {
            console.error("Failed to unlock key:", e);
            alert("Incorrect passphrase.");
        }
    };

    return (
        <div>
            <Show when={state() === 'waiting_for_passphrase'}>
                <div class="encrypted-message-frame" style={{ "border-color": "var(--text-warning)" }}>
                    <p style={{ "margin-bottom": "8px", "font-weight": "bold", color: "var(--text-warning)" }}>
                        🔒 Private Key Locked
                    </p>
                    <div style={{ display: "flex", gap: "8px" }}>
                        <input
                            type="password"
                            placeholder="Enter Passphrase"
                            value={passphrase()}
                            onInput={(e) => setPassphrase(e.currentTarget.value)}
                            style={{
                                background: "var(--input-background)",
                                border: "none",
                                padding: "8px",
                                "border-radius": "4px",
                                color: "var(--text-normal)",
                                flex: 1
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleDecrypt()}
                        />
                        <button
                            onClick={handleDecrypt}
                            style={{
                                background: "var(--brand-experiment)",
                                color: "var(--interactive-active)",
                                border: "none",
                                padding: "8px 16px",
                                "border-radius": "4px",
                                cursor: "pointer"
                            }}
                        >
                            Decrypt
                        </button>
                    </div>
                </div>
            </Show>

            <Show when={state() !== 'waiting_for_passphrase'}>
                <EncryptedMessage state={state() as any} content={content()} />
            </Show>
        </div>
    );
};

const handleEncryptedText = (element: Element, text: string) => {
    // Avoid double injection
    if (element.getAttribute("data-pgpcord-injected") === "true") return;
    element.setAttribute("data-pgpcord-injected", "true");

    // Hide original content and append our component
    element.innerHTML = "";

    const container = document.createElement("div");
    element.appendChild(container);

    render(() => <DecryptedMessageContainer encryptedContent={text} />, container);
};

const handleEncryptedFile = async (attachmentElement: Element, messageContentElement: Element) => {
    if (messageContentElement.getAttribute("data-pgpcord-injected") === "true") return;

    let anchor = attachmentElement.querySelector<HTMLAnchorElement>("a[href]");

    // If not found inside, check if the element itself is an anchor or if it's close by
    if (!anchor) {
        anchor = attachmentElement.closest<HTMLAnchorElement>("a[href]");
    }

    if (!anchor && attachmentElement.parentElement) {
        // Try looking in the parent (common for some Discord layouts)
        anchor = attachmentElement.parentElement.querySelector<HTMLAnchorElement>("a[href]");

        // Try grandparent if needed
        if (!anchor && attachmentElement.parentElement.parentElement) {
            anchor = attachmentElement.parentElement.parentElement.querySelector<HTMLAnchorElement>("a[href]");
        }
    }

    if (!anchor) {
        console.warn("PGPCord: Could not find download link for message.txt attachment", attachmentElement);
        return;
    }

    console.log("PGPCord: Found anchor for message.txt", anchor.href);

    // Allow any discord CDN or standard URL, just check if it looks like a file link
    if (!anchor.href.includes("discord")) {
        // Optional: stricter check if needed, but for now let's be permissive and rely on content check
        // return; 
    }

    try {
        const url = anchor.href;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch attachment");

        const textContent = await response.text();
        if (PGP_BLOCK_REGEX.test(textContent)) {
            // Mark as injected on the main content element
            messageContentElement.setAttribute("data-pgpcord-injected", "true");

            // Hide the attachment and the (now empty) message body
            (attachmentElement.parentElement as HTMLElement).style.display = 'none';
            messageContentElement.innerHTML = "";

            const container = document.createElement("div");
            messageContentElement.appendChild(container);

            render(() => <DecryptedMessageContainer encryptedContent={textContent} />, container);
        }
    } catch (e) {
        console.error("PGPCord: Failed to process encrypted file.", e);
    }
};

export const patchMessageContent = () => {
    // We look for message content elements.
    unobserve = observeDom("[id^='message-content-']", (element) => {
        // 1. Check for PGP block in text content
        const text = element.textContent;
        if (text && PGP_BLOCK_REGEX.test(text)) {
            handleEncryptedText(element, text);
            return; // Stop if we found a text block
        }

        // 2. Check for message.txt attachment
        const messageElement = element.closest("[id^='chat-messages-']");
        if (!messageElement) return;

        // Relaxed selector to match any attachment container
        const attachment = messageElement.querySelector("[class*='attachment']");
        if (attachment) {
            // Check for message.txt in text content or alt text, and ensure it's a text file
            const textContent = attachment.textContent || "";
            const isMessageTxt = textContent.includes("message.txt") || attachment.querySelector("a[href*='message.txt']");

            if (isMessageTxt) {
                console.log("PGPCord: Found potential message.txt attachment", attachment);
                handleEncryptedFile(attachment, element);
            }
        }
    });
};

export const unpatchMessage = () => {
    if (unobserve) unobserve();
};
