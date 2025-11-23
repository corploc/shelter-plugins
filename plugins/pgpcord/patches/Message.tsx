import { render } from "solid-js/web";
import { createSignal, onMount } from "solid-js";
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

const DecryptedMessageContainer = (props: { encryptedContent: string }) => {
  const [content, setContent] = createSignal("");
  const [state, setState] = createSignal<"decrypting" | "decrypted" | "error">("decrypting");

  onMount(async () => {
    try {
      const decrypted = await decryptMessage(props.encryptedContent);
      setContent(decrypted);
      setState("decrypted");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setContent(errorMessage);
      setState("error");
      console.error("PGPCord: Failed to decrypt message:", err);
    }
  });

  return <EncryptedMessage state={state()} content={content()} />;
};

export const patchMessageContent = () => {
    // We look for message content elements.
    // The ID usually starts with "message-content-".
    unobserve = observeDom("[id^='message-content-']", (element) => {
        // Check if it contains PGP message
        const text = element.textContent;
        if (text && PGP_BLOCK_REGEX.test(text)) {
            // Avoid double injection
            if (element.getAttribute("data-pgpcord-injected") === "true") return;
            
            // Mark as injected
            element.setAttribute("data-pgpcord-injected", "true");
            
            // Clear content and mount our component
            // We hide the original content (or remove it) and append ours.
            // Clearing innerHTML is safest to remove the raw text.
            element.innerHTML = ""; 
            
            const container = document.createElement("div");
            element.appendChild(container);
            
            render(() => <DecryptedMessageContainer encryptedContent={text} />, container);
        }
    });
};

export const unpatchMessage = () => {
  if (unobserve) unobserve();
};
