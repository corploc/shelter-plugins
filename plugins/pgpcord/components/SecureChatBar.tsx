import { createSignal, onMount, onCleanup, createEffect } from "solid-js";
import { WEB_BASE_URL } from "../lib/constants";
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

interface ChannelStatus {
  hasKeys: boolean;
  lastChecked: number;
  isDm: boolean;
}

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
    // Initialize store if needed
    if (!shelter.plugin.store.pgpcord_channel_status) {
      shelter.plugin.store.pgpcord_channel_status = {};
    }

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

  // Polling effect for server channels
  createEffect(() => {
    const channelId = currentChannelId();
    if (!channelId) return;

    const channel = shelter.util?.getChannel?.(channelId) || shelter.flux?.stores?.ChannelStore?.getChannel(channelId);
    if (channel?.guild_id) {
      // Poll every minute for server channels
      const interval = setInterval(() => {
        checkKeys(channelId, true);
      }, 60000);
      onCleanup(() => clearInterval(interval));
    }
  });

  const checkKeys = async (channelId: string, force = false) => {
    // Don't check if we don't have our own key yet (unless we are just checking status)
    // But we need to know if we have keys to enable the button.

    const currentUser = shelter.flux.stores.UserStore.getCurrentUser();
    if (!currentUser) return;

    // Check cache first
    const cachedStatus = shelter.plugin.store.pgpcord_channel_status?.[channelId] as ChannelStatus | undefined;

    if (!force && cachedStatus) {
      // For DMs, use cache forever (until manual re-check via click)
      // For Servers, use cache if fresh (< 1 min)
      const isFresh = Date.now() - cachedStatus.lastChecked < 60000;

      if (cachedStatus.isDm || isFresh) {
        setHasKeys(cachedStatus.hasKeys);
        setHasCheckedKeys(true);

        // Restore lock state if keys exist
        if (cachedStatus.hasKeys) {
          const storedLockState = shelter.plugin.store.pgpcord_lock_state?.[channelId];
          const shouldLock = storedLockState === undefined ? true : storedLockState;
          setGlobalSecureMode(shouldLock);
        }
        return;
      }
    }

    setChecking(true);
    try {
      // Check if we have our own keys (if not already checked)
      if (!currentUserHasKey()) {
        const ownKey = await checkCurrentUserKey();
        setCurrentUserHasKey(!!ownKey);
        if (!ownKey) {
          setHasKeys(false);
          setHasCheckedKeys(true);
          setGlobalSecureMode(false);
          return;
        }
      }

      // Check recipients
      const channel = shelter.util?.getChannel?.(channelId) || shelter.flux?.stores?.ChannelStore?.getChannel(channelId);
      if (!channel) return;

      let recipientIds: string[] = [];
      let isDm = false;

      if (channel.recipients) {
        // DM or Group DM
        recipientIds = [...channel.recipients];
        isDm = true;
      } else if (channel.guild_id) {
        // Guild Channel
        const guildId = channel.guild_id;
        const memberIds = new Set<string>();

        // 1. Try to get cached guild members
        const cachedMembers = shelter.flux.stores.GuildMemberStore?.getMemberIds(guildId);
        if (cachedMembers && Array.isArray(cachedMembers)) {
          cachedMembers.forEach((id: string) => memberIds.add(id));
        }

        // 2. Get recent message authors
        const messages = shelter.flux.stores.MessageStore.getMessages(channelId);
        if (messages && messages.toArray) {
          messages.toArray().forEach((msg: any) => {
            if (msg.author?.id) memberIds.add(msg.author.id);
          });
        }

        if (memberIds.size > 0) {
          recipientIds = Array.from(memberIds).slice(0, 100);
        }
      } else {
        recipientIds = [channel.id];
      }

      // Filter out self
      const otherRecipients = recipientIds.filter((id: string) => id !== currentUser.id);

      if (otherRecipients.length === 0) {
        // Empty channel or just self
        const hasKeysResult = !channel.guild_id; // Allow self-DM encryption
        updateChannelStatus(channelId, hasKeysResult, isDm);
        return;
      }

      const keys = await getPublicKeys(otherRecipients);

      let allFound = false;
      if (channel.guild_id) {
        allFound = keys.length > 0;
      } else {
        allFound = keys.length === otherRecipients.length;
      }

      updateChannelStatus(channelId, allFound, isDm);

    } catch (e) {
      console.error("PGPCord: Error checking keys", e);
      setHasKeys(false);
      setGlobalSecureMode(false);
    } finally {
      setChecking(false);
    }
  };

  const updateChannelStatus = (channelId: string, hasKeysResult: boolean, isDm: boolean) => {
    setHasKeys(hasKeysResult);
    setHasCheckedKeys(true);

    // Update cache
    if (!shelter.plugin.store.pgpcord_channel_status) {
      shelter.plugin.store.pgpcord_channel_status = {};
    }
    shelter.plugin.store.pgpcord_channel_status[channelId] = {
      hasKeys: hasKeysResult,
      lastChecked: Date.now(),
      isDm
    };

    // Update global secure mode based on result and preference
    if (hasKeysResult) {
      if (!shelter.plugin.store.pgpcord_lock_state) {
        shelter.plugin.store.pgpcord_lock_state = {};
      }
      const storedState = shelter.plugin.store.pgpcord_lock_state[channelId];
      const shouldLock = storedState === undefined ? true : storedState;
      setGlobalSecureMode(shouldLock);
    } else {
      setGlobalSecureMode(false);
    }

    // Trigger reprocessing
    setTimeout(() => reprocessMessages(channelId), 100);
  };

  const onChannelChange = (channelId: string) => {
    setCurrentChannelId(channelId);

    // Reset UI state immediately to avoid "Green then Red" glitch
    setHasKeys(false);
    setHasCheckedKeys(false);
    setGlobalSecureMode(false);

    // Check keys (will use cache if available)
    checkKeys(channelId);
  };

  const isDisabled = () => !currentUserHasKey() || !hasKeys();

  const handleClick = async () => {
    if (isDisabled() || checking() || checkingCurrentUser()) return;

    // Toggle secure mode
    const newMode = !isSecureMode();
    setGlobalSecureMode(newMode);

    if (!shelter.plugin.store.pgpcord_lock_state) {
      shelter.plugin.store.pgpcord_lock_state = {};
    }
    shelter.plugin.store.pgpcord_lock_state[currentChannelId()] = newMode;

    reprocessMessages(currentChannelId());
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
    .secure-chat-bar-button.disabled {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
    }
    .secure-chat-bar-button:hover:not(.disabled) {
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
    if (!hasKeys()) return "Recipient has no key.";
    return isSecureMode() ? "Disable Encryption" : "Enable Encryption";
  };

  return (
    <div
      ref={ref}
      class={`secure-chat-bar-button ${isDisabled() ? "disabled" : ""}`}
      onClick={handleClick}
      title={getTitle()}
    >
      <LockIcon locked={isSecureMode()} disabled={isDisabled()} />
    </div>
  );
};
