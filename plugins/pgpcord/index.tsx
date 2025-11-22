import { definePlugin } from "shelter";
import Settings from "./components/Settings";
import { patchChatBar, unpatchChatBar } from "./patches/ChatBar";
import { patchMessageContent, unpatchMessage } from "./patches/Message";

// Define the plugin
const pgpcord = definePlugin({
  // The name of the plugin
  name: "PGPCord",
  // The author of the plugin
  author: "Gemini",
  // A description of the plugin
  description: "End-to-end PGP encryption for Discord messages.",
  
  // Called when the plugin is loaded
  onLoad: () => {
    pgpcord.settings.register("PGPCord", Settings);
    patchChatBar();
    patchMessageContent();
  },

  // Called when the plugin is unloaded
  onUnload: () => {
    unpatchChatBar();
    unpatchMessage();
  },
});

export default pgpcord;