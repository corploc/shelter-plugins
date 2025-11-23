import Settings from "./components/Settings";
import { patchChatBar, unpatchChatBar } from "./patches/ChatBar";
import { patchMessageContent, unpatchMessage } from "./patches/Message";

// Define the plugin
export default {
  // The name of the plugin
  name: "PGPCord",
  // The author of the plugin
  author: "Gemini",
  // A description of the plugin
  description: "End-to-end PGP encryption for Discord messages.",
  
  // Called when the plugin is loaded
  onLoad: () => {
    patchChatBar();
    patchMessageContent();
  },

  // Called when the plugin is unloaded
  onUnload: () => {
    unpatchChatBar();
    unpatchMessage();
  },

  settings: Settings,
};