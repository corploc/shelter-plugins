import { spitroast } from "shelter";
import { render } from "solid-js/web";
import { createSignal, onMount } from "solid-js";
import EncryptedMessage from "../components/EncryptedMessage";
import { decryptMessage } from "../lib/crypto";

const PGP_BLOCK_REGEX = /-----BEGIN PGP MESSAGE-----(.|\n)*-----END PGP MESSAGE-----/;

let unpatchMessageContent: (() => void) | null = null;

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
  const MessageContent = shelter.webpack.findByProps("MessageContent");

  if (!MessageContent) {
    console.error("PGPCord: Could not find MessageContent component to patch.");
    return;
  }

  unpatchMessageContent = spitroast.after(MessageContent, "default", (args, res) => {
    const { message } = args[0];

    if (message && message.content && PGP_BLOCK_REGEX.test(message.content)) {
      const contentElement = res.props.children.find(c => c?.props?.content);
      if(contentElement) {
        const originalContent = contentElement.props.content;
        const container = document.createElement("div");
        contentElement.props.content = [container];
        render(() => <DecryptedMessageContainer encryptedContent={originalContent} />, container);
      }
    }
    
    return res;
  });
};

export const unpatchMessage = () => {
  if (unpatchMessageContent) unpatchMessageContent();
};
