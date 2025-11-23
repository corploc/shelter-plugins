import { createSignal, createEffect, onCleanup, onMount } from "solid-js";
import { isSecureMode, setSecureMode } from "../lib/store";
import { getPublicKeys } from "../lib/api";

declare const shelter: any;

// A simple lock icon component.
const LockIcon = (props: { locked: boolean, disabled?: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class={props.locked ? "locked-icon" : (props.disabled ? "disabled-icon" : "unlocked-icon")}
    style={props.disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
  >
    {props.locked ? (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </>
    ) : (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
      </>
    )}
  </svg>
);

export default () => {
  const [hasKeys, setHasKeys] = createSignal(false);
  const [checking, setChecking] = createSignal(false);
  const [currentChannelId, setCurrentChannelId] = createSignal<string | null>(null);

  const checkKeys = async (channelId: string) => {
      setChecking(true);
      try {
          const channel = shelter.util?.getChannel?.(channelId) || shelter.flux?.stores?.ChannelStore?.getChannel(channelId);
          if (!channel) {
              setHasKeys(false);
              return;
          }

          const recipientIds = channel.recipients || [];
          if (recipientIds.length === 0) {
              // Not a DM or Group DM, or no recipients.
              // Maybe a guild channel? We don't support guild channels yet or we treat them as "no keys needed" (public)?
              // For now, assume we only support DMs.
              setHasKeys(false);
              return;
          }

          const keys = await getPublicKeys(recipientIds);
          // We need keys for ALL recipients to be secure? Or at least one?
          // Usually all.
          const foundIds = new Set(keys.map(k => k.discord_id));
          const allFound = recipientIds.every((id: string) => foundIds.has(id));
          
          setHasKeys(allFound);
          
          // If not all found, disable secure mode if it was on
          if (!allFound && isSecureMode()) {
              setSecureMode(false);
          }

      } catch (e) {
          console.error("PGPCord: Error checking keys", e);
          setHasKeys(false);
      } finally {
          setChecking(false);
      }
  };

  // Poll for channel changes or subscribe to flux
  // Using polling for simplicity as flux subscription requires knowing the event name (CHANNEL_SELECT)
  const interval = setInterval(() => {
      const channelId = shelter.flux?.stores?.SelectedChannelStore?.getChannelId();
      if (channelId !== currentChannelId()) {
          setCurrentChannelId(channelId);
          if (channelId) checkKeys(channelId);
      }
  }, 1000);

  onCleanup(() => clearInterval(interval));

  const handleClick = () => {
    if (checking()) return;

    if (!hasKeys()) {
        // Send invite message
        const inviteText = "I am using PGPCord to encrypt my messages. Please install it and set up your keys so we can chat securely: https://pgpcord.dev"; // Replace with actual URL
        
        // Try to insert into chat bar
        // We can try to find the textarea and set value
        const textarea = document.querySelector("form textarea") as HTMLTextAreaElement;
        if (textarea) {
            // React hack to set value
            const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
            nativeTextAreaValueSetter?.call(textarea, inviteText);
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            alert("Could not find chat bar to insert invite. Please send this link manually: https://pgpcord.dev");
        }
        return;
    }

    setSecureMode(!isSecureMode());
  };

  // Inject some basic styles for the locked/unlocked states
  // This would typically be done in a separate SCSS file
  const styles = `
    .secure-chat-bar-button {
      cursor: pointer;
      margin-right: 8px;
      color: var(--interactive-normal);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 4px;
      border-radius: 4px;
      transition: background-color 0.15s ease-out, color 0.15s ease-out;
    }
    .secure-chat-bar-button:hover {
      background-color: var(--background-modifier-hover);
      color: var(--interactive-hover);
    }
    .secure-chat-bar-button .locked-icon {
      color: var(--green-360); /* Green when locked */
    }
    .secure-chat-bar-button .unlocked-icon {
      color: var(--interactive-normal); /* Default color when unlocked */
    }
    .secure-chat-bar-button .disabled-icon {
      color: var(--text-muted);
    }
  `;
  shelter.ui.injectCss(styles);


  return (
    <div 
        class="secure-chat-bar-button" 
        onClick={handleClick} 
        title={checking() ? "Checking keys..." : (hasKeys() ? "Toggle Secure Mode" : "Recipient has no keys. Click to invite.")}
    >
      <LockIcon locked={isSecureMode()} disabled={!hasKeys()} />
    </div>
  );
};
