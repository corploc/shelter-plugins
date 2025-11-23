import { createSignal, onCleanup, onMount } from "solid-js";
import { isSecureMode, setSecureMode } from "../lib/store";
import { getPublicKeys, checkCurrentUserKey } from "../lib/api";

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
  const [currentUserHasKey, setCurrentUserHasKey] = createSignal(false);
  const [checkingCurrentUser, setCheckingCurrentUser] = createSignal(true);
  const [hasKeys, setHasKeys] = createSignal(false);
  const [checking, setChecking] = createSignal(false);
  const [currentChannelId, setCurrentChannelId] = createSignal<string | null>(null);
  const [hasCheckedKeys, setHasCheckedKeys] = createSignal(false);
  let ref: HTMLDivElement | undefined;

  onMount(async () => {
    setCheckingCurrentUser(true);
    const userHasKey = await checkCurrentUserKey();
    setCurrentUserHasKey(userHasKey);
    setCheckingCurrentUser(false);
  });

  const onChannelChange = (channelId: string) => {
    setCurrentChannelId(channelId);
    setHasKeys(false);
    setHasCheckedKeys(false);
    if (isSecureMode()) {
      setSecureMode(false);
    }
  };

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
              setHasKeys(false);
              return;
          }

          const keys = await getPublicKeys(recipientIds);
          const foundIds = new Set(keys.map(k => String(k.discord_id)));
          const allFound = recipientIds.every((id: string) => foundIds.has(id));
          
          setHasKeys(allFound);
          setHasCheckedKeys(true);
          
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

  const interval = setInterval(() => {
      if (!ref || !document.body.contains(ref)) {
          clearInterval(interval);
          return;
      }
      const channelId = shelter.flux?.stores?.SelectedChannelStore?.getChannelId();
      if (channelId !== currentChannelId()) {
          onChannelChange(channelId);
      }
  }, 200);

  onCleanup(() => clearInterval(interval));

  const handleClick = async () => {
    if (checking() || checkingCurrentUser()) return;

    if (!currentUserHasKey()) {
        alert("You need to set up your PGP key in the PGPCord settings before you can send encrypted messages.");
        // shelter.ui.openSettings("PGPCord"); // This would be ideal
        return;
    }

    const channelId = currentChannelId();
    if (!channelId) return;

    // Always check for keys on click
    await checkKeys(channelId);

    // After checking, the `hasKeys` signal is updated. Now we can act on it.
    if (hasKeys()) {
        setSecureMode(!isSecureMode());
    } else {
        const inviteText = "I am using PGPCord to encrypt my messages. Please install it and set up your keys so we can chat securely: https://pgpcord.dev";
        
        const textarea = document.querySelector("form textarea") as HTMLTextAreaElement;
        if (textarea) {
            const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
            nativeTextAreaValueSetter?.call(textarea, inviteText);
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            alert("Could not find chat bar to insert invite. Please send this link manually: https://pgpcord.dev");
        }
    }
  };

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
      color: var(--green-360);
    }
    .secure-chat-bar-button .unlocked-icon {
      color: var(--interactive-normal);
    }
    .secure-chat-bar-button .disabled-icon {
      color: var(--text-muted);
    }
  `;
  shelter.ui.injectCss(styles);

  const getTitle = () => {
    if (checkingCurrentUser()) return "Checking your key...";
    if (!currentUserHasKey()) return "You need to set up your key in settings.";
    if (checking()) return "Checking recipient's keys...";
    if (!hasKeys() && hasCheckedKeys()) return "Recipient has no key. Click to invite.";
    // Always check on click, so this state is less relevant, but good for clarity
    if (!hasKeys() && !hasCheckedKeys()) return "Click to check for recipient's key.";
    return "Toggle Secure Mode";
  };

  return (
    <div 
        ref={ref}
        class="secure-chat-bar-button" 
        onClick={handleClick} 
        title={getTitle()}
    >
      <LockIcon locked={isSecureMode()} disabled={!currentUserHasKey() || (!hasKeys() && hasCheckedKeys())} />
    </div>
  );
};
