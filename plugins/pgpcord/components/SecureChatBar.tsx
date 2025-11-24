import { createSignal, onMount, onCleanup, createEffect } from "solid-js";
import { checkCurrentUserKey, getPublicKeys } from "../lib/api";
import { isSecureMode as globalIsSecureMode, setSecureMode as setGlobalSecureMode } from "../lib/store";
import { reprocessMessages } from "../patches/Message";

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
  const [isSecureMode, setSecureMode] = createSignal(globalIsSecureMode());
  const [currentUserHasKey, setCurrentUserHasKey] = createSignal(false);
  const [checkingCurrentUser, setCheckingCurrentUser] = createSignal(true);
  const [hasKeys, setHasKeys] = createSignal(false);
  const [checking, setChecking] = createSignal(false);
  const [hasCheckedKeys, setHasCheckedKeys] = createSignal(false);
  const [currentChannelId, setCurrentChannelId] = createSignal("");
  let ref: HTMLDivElement | undefined;

  // Sync with global store
  createEffect(() => {
    setSecureMode(globalIsSecureMode());
  });

  onMount(async () => {
    setCheckingCurrentUser(true);
    const userKey = await checkCurrentUserKey();
    setCurrentUserHasKey(!!userKey);
    setCheckingCurrentUser(false);

    const channelId = shelter.flux?.stores?.SelectedChannelStore?.getChannelId();
    if (channelId) onChannelChange(channelId);

    const unsubscribe = shelter.flux.stores.SelectedChannelStore.addChangeListener(() => {
      const newChannelId = shelter.flux?.stores?.SelectedChannelStore?.getChannelId();
      if (newChannelId && newChannelId !== currentChannelId()) {
        onChannelChange(newChannelId);
      }
    });

    onCleanup(() => unsubscribe());
  });

  const checkKeys = async (channelId: string) => {
    setChecking(true);
    try {
      const currentUser = shelter.flux.stores.UserStore.getCurrentUser();
      if (!currentUser) return;

      // Check if we have our own keys
      const ownKey = await checkCurrentUserKey();
      if (!ownKey) {
        setHasKeys(false);
        setHasCheckedKeys(true);
        setGlobalSecureMode(false);
        return;
      }

      // Check recipients
      const channel = shelter.util?.getChannel?.(channelId) || shelter.flux?.stores?.ChannelStore?.getChannel(channelId);
      if (!channel) return;

      const recipientIds = channel.recipients ? channel.recipients : [channel.id]; // DM or Group DM
      // Filter out self
      const otherRecipients = recipientIds.filter((id: string) => id !== currentUser.id);

      if (otherRecipients.length === 0) {
        // Saved Messages or just self
        setHasKeys(true);
        setHasCheckedKeys(true);
        return;
      }

      const keys = await getPublicKeys(otherRecipients);
      const allFound = keys.length === otherRecipients.length;

      setHasKeys(allFound);
      setHasCheckedKeys(true);

      // Persistence Logic
      if (!shelter.plugin.store.pgpcord_lock_state) {
        shelter.plugin.store.pgpcord_lock_state = {};
      }

      if (allFound) {
        const storedState = shelter.plugin.store.pgpcord_lock_state[channelId];
        const shouldLock = storedState === undefined ? true : storedState;
        setGlobalSecureMode(shouldLock);
      } else {
        setGlobalSecureMode(false);
      }

      // Trigger reprocessing to apply visibility based on the new mode
      setTimeout(() => reprocessMessages(channelId), 100);

    } catch (e) {
      console.error("PGPCord: Error checking keys", e);
      setHasKeys(false);
      setGlobalSecureMode(false);
    } finally {
      setChecking(false);
    }
  };

  const onChannelChange = (channelId: string) => {
    setCurrentChannelId(channelId);
    setHasKeys(false);
    setHasCheckedKeys(false);
    // Don't disable secure mode immediately; let checkKeys decide based on persistence
    checkKeys(channelId);
  };

  const handleClick = async () => {
    if (checking() || checkingCurrentUser()) return;

    if (!currentUserHasKey()) {
      alert("You need to set up your PGP key in the PGPCord settings before you can send encrypted messages.");
      // shelter.ui.openSettings("PGPCord"); // This would be ideal
      return;
    }

    const channelId = currentChannelId();
    if (!channelId) return;

    // If we haven't checked keys yet (e.g. failed initially), check now
    if (!hasCheckedKeys()) {
      await checkKeys(channelId);
    }

    if (hasKeys()) {
      const newMode = !isSecureMode();
      setGlobalSecureMode(newMode);

      if (!shelter.plugin.store.pgpcord_lock_state) {
        shelter.plugin.store.pgpcord_lock_state = {};
      }
      shelter.plugin.store.pgpcord_lock_state[channelId] = newMode;

      // Reprocess messages
      reprocessMessages(channelId);
    } else {
      const inviteText = "I am using PGPCord to encrypt my messages. Please install it and set up your keys so we can chat securely: https://pgcordweb.bash62.workers.dev/";

      // Try to find the chat input using multiple selectors
      const chatInput = document.querySelector('[role="textbox"]') ||
        document.querySelector('form textarea') ||
        document.querySelector('[contenteditable="true"]');

      if (chatInput) {
        // Focus the input first
        (chatInput as HTMLElement).focus();

        // For Slate editor (contenteditable div)
        if (chatInput.getAttribute('contenteditable') === 'true') {
          // Simulate a paste event which is handled by Slate to update its internal state
          const dataTransfer = new DataTransfer();
          dataTransfer.setData('text/plain', inviteText);
          const pasteEvent = new ClipboardEvent('paste', {
            clipboardData: dataTransfer,
            bubbles: true,
            cancelable: true
          });
          chatInput.dispatchEvent(pasteEvent);
        } else {
          // For standard textareas
          const nativeTextAreaValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;
          nativeTextAreaValueSetter?.call(chatInput, inviteText);
          chatInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
      } else {
        alert("Could not find chat bar to insert invite. Please send this link manually: https://pgcordweb.bash62.workers.dev/");
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
