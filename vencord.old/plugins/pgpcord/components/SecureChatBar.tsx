import React, { useState, useEffect } from 'react';
import { checkCurrentUserKey, getPublicKeys } from '../lib/api';
import { isSecureMode as globalIsSecureMode, setSecureMode as setGlobalSecureMode, addSecureModeListener, Store } from '../lib/store';
import { findByProps } from "@vencord/webpack";

const SelectedChannelStore = findByProps("getChannelId", "getVoiceChannelId");
const ChannelStore = findByProps("getChannel", "getDMFromUserId");
const UserStore = findByProps("getCurrentUser", "getUser");

// A simple lock icon component.
const LockIcon = ({ locked, disabled }: { locked: boolean, disabled?: boolean }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={locked ? "locked-icon" : (disabled ? "disabled-icon" : "unlocked-icon")}
        style={disabled ? { opacity: 0.5, cursor: "not-allowed" } : {}}
    >
        {locked ? (
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

export const SecureChatBar = () => {
    const [isSecureMode, setSecureMode] = useState(globalIsSecureMode());
    const [currentUserHasKey, setCurrentUserHasKey] = useState(false);
    const [checkingCurrentUser, setCheckingCurrentUser] = useState(true);
    const [hasKeys, setHasKeys] = useState(false);
    const [checking, setChecking] = useState(false);
    const [hasCheckedKeys, setHasCheckedKeys] = useState(false);
    const [currentChannelId, setCurrentChannelId] = useState("");

    // Sync with global store
    useEffect(() => {
        const removeListener = addSecureModeListener(() => {
            setSecureMode(globalIsSecureMode());
        });
        return removeListener;
    }, []);

    useEffect(() => {
        const init = async () => {
            setCheckingCurrentUser(true);
            const userKey = await checkCurrentUserKey();
            setCurrentUserHasKey(!!userKey);
            setCheckingCurrentUser(false);

            const channelId = SelectedChannelStore?.getChannelId();
            if (channelId) onChannelChange(channelId);
        };
        init();

        const handleChannelChange = () => {
            const newChannelId = SelectedChannelStore?.getChannelId();
            if (newChannelId && newChannelId !== currentChannelId) {
                onChannelChange(newChannelId);
            }
        };

        // Vencord doesn't expose a simple addChangeListener for stores directly in the same way as Shelter sometimes
        // But usually we can subscribe to the store.
        // For now, we'll rely on re-renders or a polling mechanism if store subscription is complex without boilerplate.
        // Actually, SelectedChannelStore is a Flux store, so we can add a listener.
        SelectedChannelStore?.addChangeListener(handleChannelChange);
        return () => SelectedChannelStore?.removeChangeListener(handleChannelChange);
    }, [currentChannelId]); // Dependency on currentChannelId to detect changes? No, store listener handles it.

    const checkKeys = async (channelId: string) => {
        setChecking(true);
        try {
            const currentUser = UserStore?.getCurrentUser();
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
            const channel = ChannelStore?.getChannel(channelId);
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
            const lockState = Store.lockState;
            if (allFound) {
                const storedState = lockState[channelId];
                const shouldLock = storedState === undefined ? true : storedState;
                setGlobalSecureMode(shouldLock);
            } else {
                setGlobalSecureMode(false);
            }

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
        checkKeys(channelId);
    };

    const handleClick = async () => {
        if (checking || checkingCurrentUser) return;

        if (!currentUserHasKey) {
            alert("You need to set up your PGP key in the PGPCord settings before you can send encrypted messages.");
            return;
        }

        const channelId = currentChannelId;
        if (!channelId) return;

        // If we haven't checked keys yet (e.g. failed initially), check now
        if (!hasCheckedKeys) {
            await checkKeys(channelId);
        }

        if (hasKeys) {
            const newMode = !isSecureMode;
            setGlobalSecureMode(newMode);

            const lockState = Store.lockState;
            lockState[channelId] = newMode;
            Store.lockState = lockState;
        } else {
            const inviteText = "I am using PGPCord to encrypt my messages. Please install it and set up your keys so we can chat securely: https://localhost:3000/";

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
                alert("Could not find chat bar to insert invite. Please send this link manually: https://localhost:3000/");
            }
        }
    };

    const getTitle = () => {
        if (checkingCurrentUser) return "Checking your key...";
        if (!currentUserHasKey) return "You need to set up your key in settings.";
        if (checking) return "Checking recipient's keys...";
        if (!hasKeys && hasCheckedKeys) return "Recipient has no key. Click to invite.";
        if (!hasKeys && !hasCheckedKeys) return "Click to check for recipient's key.";
        return "Toggle Secure Mode";
    };

    return (
        <div
            className="secure-chat-bar-button"
            onClick={handleClick}
            title={getTitle()}
            style={{
                cursor: 'pointer',
                marginRight: '8px',
                color: 'var(--interactive-normal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                padding: '4px',
                borderRadius: '4px',
                transition: 'background-color 0.15s ease-out, color 0.15s ease-out'
            }}
        >
            <LockIcon locked={isSecureMode} disabled={!currentUserHasKey || (!hasKeys && hasCheckedKeys)} />
            <style>{`
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
      `}</style>
        </div>
    );
};
