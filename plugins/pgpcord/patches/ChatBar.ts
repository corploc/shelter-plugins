import { spitroast } from "shelter";
import { render } from "solid-js/web";
import SecureChatBar from "../components/SecureChatBar";
import { encryptMessage } from "../lib/crypto";

// This is a placeholder for the actual search function.
// In a real scenario, you would use Webpack search utilities provided by Shelter/Vencord.
const findComponent = (displayName: string) => {
  // e.g., return Vencord.Webpack.findByDisplayName(displayName, { raw: true });
  return null;
};

let disposeSecureChatBar: (() => void) | null = null;
let unpatchSendMessage: (() => void) | null = null;

export const patchChatBar = () => {
  // This is a placeholder for finding the ChannelTextArea component.
  // The actual name might be different and could change with Discord updates.
  const ChannelTextArea = findComponent("ChannelTextArea");

  if (!ChannelTextArea) {
    console.error("PGPCord: Could not find ChannelTextArea component to patch.");
    return;
  }

  // Patch the render method of the component
  unpatchSendMessage = spitroast.after(ChannelTextArea, "type", (args, res) => {
    // res is the rendered element. We need to find the right place to inject our component.
    const form = res.querySelector("form");
    if (form) {
      const chatBarContainer = document.createElement("div");
      chatBarContainer.id = "pgpcord-chat-bar-container";
      form.prepend(chatBarContainer);
      disposeSecureChatBar = render(() => <SecureChatBar />, chatBarContainer);
    }

    // Patch the sendMessage function in the props
    const { sendMessage } = args[0];
    if (sendMessage) {
      args[0].sendMessage = async (message, ...rest) => {
        // This is a placeholder for checking if secure mode is active.
        // The state would be managed by the SecureChatBar component and shared.
        const isSecureMode = document.getElementById("pgpcord-chat-bar-container")?.querySelector(".locked-icon");

        if (isSecureMode) {
          try {
            // This is a placeholder for getting recipient IDs.
            const recipientIds = ["123456789012345678"];
            const encryptedContent = await encryptMessage(message.content, recipientIds);
            message.content = encryptedContent;
          } catch (error) {
            console.error("PGPCord: Failed to encrypt message:", error);
            // Optionally, show an error to the user instead of sending plaintext.
            return;
          }
        }
        return sendMessage(message, ...rest);
      };
    }

    return res;
  });
};

export const unpatchChatBar = () => {
  if (unpatchSendMessage) unpatchSendMessage();
  if (disposeSecureChatBar) disposeSecureChatBar();
  const container = document.getElementById("pgpcord-chat-bar-container");
  if(container) container.remove();
};
