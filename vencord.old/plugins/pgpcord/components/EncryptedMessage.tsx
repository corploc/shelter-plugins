import React, { useState, useEffect } from 'react';
import { decryptMessage, decryptAndCachePrivateKey, PassphraseRequiredError, WrongKeyError } from '../lib/crypto';
import { reprocessMessages } from '../index'; // Circular dependency? We'll handle reprocessMessages export in index.tsx
import { Store } from '../lib/store';

interface EncryptedMessageProps {
    encryptedContent: string;
    messageId: string;
    channelId: string;
    onDecrypted: (decrypted: string) => void;
}

export const EncryptedMessage = ({ encryptedContent, messageId, channelId, onDecrypted }: EncryptedMessageProps) => {
    const [content, setContent] = useState("");
    const [state, setState] = useState<"decrypting" | "decrypted" | "error" | "waiting_for_passphrase" | "wrong_key">("decrypting");
    const [passphrase, setPassphrase] = useState("");

    const attemptDecryption = async () => {
        try {
            const decrypted = await decryptMessage(encryptedContent);
            onDecrypted(decrypted);
            setState("decrypted");
        } catch (err) {
            if (err instanceof PassphraseRequiredError) {
                setState("waiting_for_passphrase");
            } else if (err instanceof WrongKeyError) {
                setState("wrong_key");
            } else {
                console.error("PGPCord: Decryption failed", err);
                setState("error");
                const errorMessage = err instanceof Error ? err.message : "Unknown error";
                setContent(`Decryption failed: ${errorMessage}`);
            }
        }
    };

    useEffect(() => {
        attemptDecryption();
    }, [encryptedContent]);

    const handlePassphraseSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setState("decrypting");
        try {
            await decryptAndCachePrivateKey(passphrase);
            await attemptDecryption();

            // Trigger reprocessing of other messages
            // We'll dispatch a custom event or call a global function
            window.dispatchEvent(new CustomEvent('pgpcord-reprocess'));
        } catch (err) {
            console.error("PGPCord: Passphrase incorrect or decryption failed", err);
            setState("error");
            setContent("Incorrect passphrase or decryption failed.");
        }
    };

    return (
        <div style={{
            backgroundColor: "var(--background-secondary)",
            borderRadius: "8px",
            padding: "12px",
            marginTop: "8px",
            border: "1px solid var(--background-modifier-accent)"
        }}>
            {state === "waiting_for_passphrase" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--header-secondary)" }}>
                        <span style={{ fontSize: "1.2em" }}>🔒</span>
                        <span style={{ fontWeight: "600" }}>PGP Encrypted Message</span>
                    </div>
                    <form onSubmit={handlePassphraseSubmit} style={{ display: "flex", gap: "8px" }}>
                        <input
                            type="password"
                            placeholder="Enter passphrase to unlock key..."
                            value={passphrase}
                            onChange={(e) => setPassphrase(e.target.value)}
                            style={{
                                flexGrow: 1,
                                padding: "8px 12px",
                                borderRadius: "4px",
                                border: "1px solid var(--background-tertiary)",
                                backgroundColor: "var(--background-tertiary)",
                                color: "var(--text-normal)",
                                fontSize: "14px"
                            }}
                        />
                        <button type="submit" style={{
                            padding: "8px 16px",
                            borderRadius: "4px",
                            border: "none",
                            backgroundColor: "var(--brand-experiment)",
                            color: "var(--interactive-active)",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "background-color 0.17s ease"
                        }}>
                            Unlock
                        </button>
                    </form>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Your private key is locked. Enter your passphrase to decrypt this and other messages.
                    </div>
                </div>
            )}

            {state === "wrong_key" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-muted)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "1.2em" }}>🔑</span>
                        <span style={{ fontWeight: "600" }}>Encrypted with a different key</span>
                    </div>
                    <div style={{ fontSize: "12px" }}>
                        This message cannot be decrypted with your current private key. It may have been encrypted with an old key or for a different user.
                    </div>
                </div>
            )}

            {state === "decrypting" && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-normal)" }}>
                    <div className="spinner-dots" style={{
                        width: "20px", height: "20px",
                        border: "2px solid var(--text-muted)",
                        borderTopColor: "var(--brand-experiment)",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite"
                    }}></div>
                    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    <span>Decrypting message...</span>
                </div>
            )}

            {state === "error" && (
                <div style={{ color: "var(--text-danger)", display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>⚠️</span>
                        <span>Error Decrypting Message</span>
                    </div>
                    <div style={{ fontFamily: "monospace", backgroundColor: "var(--background-tertiary)", padding: "8px", borderRadius: "4px", fontSize: "12px" }}>
                        {content}
                    </div>
                    <button
                        onClick={() => setState("waiting_for_passphrase")}
                        style={{
                            marginTop: "4px",
                            background: "transparent",
                            border: "none",
                            color: "var(--text-link)",
                            cursor: "pointer",
                            textAlign: "left",
                            padding: "0"
                        }}
                    >
                        Try again
                    </button>
                </div>
            )}
        </div>
    );
};
