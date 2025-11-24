import React, { useState, useEffect, useRef } from 'react';
import { generateKeyPair, saveKeyPairToLocalStorage, loadKeyPairFromLocalStorage, encryptPrivateKey, decryptPrivateKey } from '../lib/crypto';
import { UserKeyPair, PluginSettings, CacheDuration } from '../lib/types';
import { checkCurrentUserKey } from '../lib/api';
import { Store } from '../lib/store';

const defaultSettings: PluginSettings = {
    cacheDuration: 'session',
    cacheTimeMinutes: 15,
    lastKnownKeyStatus: 'idle',
};

export const Settings = () => {
    const [keyPair, setKeyPair] = useState<UserKeyPair | null>(null);
    const [passphrase, setPassphrase] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<"export" | "import">("export");
    const [modalPassword, setModalPassword] = useState("");
    const [pendingImportFile, setPendingImportFile] = useState<File | null>(null);
    const [copyFeedback, setCopyFeedback] = useState(false);

    // Settings state
    const [settings, setSettings] = useState<PluginSettings>(Store.settings || defaultSettings);
    const [keyStatus, setKeyStatus] = useState<"idle" | "checking" | "found" | "not_found" | "mismatch">(
        settings.lastKnownKeyStatus || 'idle'
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadedKeys = loadKeyPairFromLocalStorage();
        if (loadedKeys) {
            setKeyPair(loadedKeys);
        }
        // Ensure settings are initialized
        if (!Store.settings || Object.keys(Store.settings).length === 0) {
            Store.settings = defaultSettings;
            setSettings(defaultSettings);
        }
    }, []);

    const updateSettings = (partial: Partial<PluginSettings>) => {
        const newSettings = { ...settings, ...partial };
        setSettings(newSettings);
        Store.settings = newSettings;
    };

    const handleGenerateKeys = async () => {
        setIsGenerating(true);
        setError(null);
        try {
            const newKeyPair = await generateKeyPair(passphrase);
            saveKeyPairToLocalStorage(newKeyPair);
            setKeyPair(newKeyPair);
        } catch (err) {
            console.error("Key generation failed:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setIsGenerating(false);
            setPassphrase("");
        }
    };

    const handlePublishKey = () => {
        window.open("http://localhost:3000/upload", "_blank");
    };

    const handleDeleteKeys = () => {
        if (confirm("Are you sure you want to delete your keys? This action cannot be undone and you will lose access to all encrypted messages.")) {
            saveKeyPairToLocalStorage(null as any); // Clear storage
            setKeyPair(null);
            setPassphrase("");
            // Redirect to delete user on server
            window.open("http://localhost:3000/delete", "_blank");
        }
    };

    const initiateExport = () => {
        setModalMode("export");
        setModalPassword("");
        setShowModal(true);
    };

    const initiateImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target;
        if (!input.files || input.files.length === 0) return;
        setPendingImportFile(input.files[0]);
        setModalMode("import");
        setModalPassword("");
        setShowModal(true);
        input.value = ""; // Reset input
    };

    const handleModalConfirm = async () => {
        setShowModal(false);
        const password = modalPassword;

        if (modalMode === "export") {
            const keys = keyPair;
            if (!keys) return;

            let privateKeyToExport = keys.privateKey;
            if (password) {
                try {
                    privateKeyToExport = await encryptPrivateKey(keys.privateKey, password);
                } catch (e) {
                    console.error("Failed to encrypt key", e);
                    setError("Failed to encrypt key. Check console.");
                    return;
                }
            }

            const exportData = { ...keys, privateKey: privateKeyToExport };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", "pgpcord_keys.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();

        } else if (modalMode === "import") {
            const file = pendingImportFile;
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const content = e.target?.result as string;
                    const parsed = JSON.parse(content);

                    if (parsed.publicKey && parsed.privateKey && parsed.keyId) {
                        let privateKey = parsed.privateKey;

                        if (password) {
                            try {
                                privateKey = await decryptPrivateKey(privateKey, password);
                            } catch (err) {
                                setError("Incorrect password or invalid key.");
                                return;
                            }
                        }

                        const newKeys = { ...parsed, privateKey };
                        saveKeyPairToLocalStorage(newKeys);
                        setKeyPair(newKeys);
                        setError(null);
                    } else {
                        throw new Error("Invalid key file format.");
                    }
                } catch (err) {
                    console.error("Import failed:", err);
                    setError("Failed to import keys. Invalid file format or wrong password.");
                }
            };
            reader.readAsText(file);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyFeedback(true);
            setTimeout(() => setCopyFeedback(false), 2000);
            console.log("PGPCord: Public key copied to clipboard.");
        }, (err) => {
            console.error("PGPCord: Failed to copy public key", err);
        });
    };

    const handleCheckStatus = async () => {
        setKeyStatus("checking");
        try {
            const serverKeyRecord = await checkCurrentUserKey();
            const localKeys = keyPair;

            let status: "found" | "not_found" | "mismatch" = "not_found";

            if (serverKeyRecord) {
                if (localKeys && serverKeyRecord.public_key.trim() === localKeys.publicKey.trim()) {
                    status = "found";
                } else {
                    status = "mismatch";
                }
            } else {
                status = "not_found";
            }

            setKeyStatus(status);
            updateSettings({ lastKnownKeyStatus: status });
        } catch (e) {
            console.error("Failed to check key status", e);
            setKeyStatus("not_found");
            updateSettings({ lastKnownKeyStatus: "not_found" });
        }
    };

    return (
        <div className="pgpcord-settings-container" style={{ padding: '16px', color: 'var(--text-normal)' }}>
            <h2 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold' }}>PGPCord Settings</h2>

            {showModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 9999
                }}>
                    <div style={{
                        background: "var(--background-primary)",
                        padding: "24px",
                        borderRadius: "8px",
                        minWidth: "320px",
                        boxShadow: "var(--elevation-high)",
                        border: "1px solid var(--background-modifier-accent)"
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '16px', fontWeight: 'bold' }}>
                            {modalMode === "export" ? "Encrypt Export" : "Decrypt Import"}
                        </h3>
                        <p style={{ marginBottom: "16px", color: 'var(--text-muted)' }}>
                            {modalMode === "export"
                                ? "Enter a password to encrypt your private key (Recommended):"
                                : "Enter the password for this key file (leave empty if none):"}
                        </p>
                        <input
                            type="password"
                            value={modalPassword}
                            onChange={(e) => setModalPassword(e.target.value)}
                            placeholder="Password"
                            style={{
                                marginBottom: "24px",
                                backgroundColor: "var(--input-background)",
                                color: "var(--text-normal)",
                                border: "none",
                                padding: "8px",
                                borderRadius: "4px",
                                width: "100%"
                            }}
                        />
                        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: "var(--button-secondary-background)",
                                    color: "var(--text-normal)",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleModalConfirm}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: "var(--brand-experiment)",
                                    color: "var(--interactive-active)",
                                    cursor: "pointer"
                                }}
                            >
                                {modalMode === "export" ? "Export" : "Import"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div style={{ color: 'var(--text-danger)', marginBottom: '16px', padding: '8px', background: 'var(--background-message-hover)', borderRadius: '4px' }}>
                    <strong>Error: </strong> {error}
                </div>
            )}

            {keyPair ? (
                <div>
                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Your PGP Keys</h3>

                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                <label style={{ fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', color: 'var(--header-secondary)' }}>Public Key</label>
                                <button
                                    onClick={() => handleCopy(keyPair.publicKey)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--brand-experiment)',
                                        cursor: 'pointer',
                                        fontSize: '12px'
                                    }}
                                >
                                    {copyFeedback ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <pre style={{
                                background: 'var(--background-secondary)',
                                padding: '8px',
                                borderRadius: '4px',
                                overflowX: 'auto',
                                fontSize: '12px',
                                fontFamily: 'monospace',
                                color: 'var(--text-muted)'
                            }}>
                                <code>{keyPair.publicKey}</code>
                            </pre>
                        </div>

                        <div style={{ display: "flex", gap: "8px", marginBottom: '16px' }}>
                            <button
                                onClick={handlePublishKey}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: "var(--button-secondary-background)",
                                    color: "var(--text-normal)",
                                    cursor: "pointer"
                                }}
                            >
                                Publish Public Key
                            </button>
                            <button
                                onClick={initiateExport}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: "var(--button-secondary-background)",
                                    color: "var(--text-normal)",
                                    cursor: "pointer"
                                }}
                            >
                                Export Keys Backup
                            </button>
                        </div>

                        <div style={{ marginTop: "16px", borderTop: "1px solid var(--background-modifier-accent)", paddingTop: "16px" }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Account Status</h4>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <button
                                    onClick={handleCheckStatus}
                                    disabled={keyStatus === "checking"}
                                    style={{
                                        padding: "8px 16px",
                                        borderRadius: "4px",
                                        border: "none",
                                        background: "var(--button-secondary-background)",
                                        color: "var(--text-normal)",
                                        cursor: "pointer",
                                        opacity: keyStatus === "checking" ? 0.5 : 1
                                    }}
                                >
                                    {keyStatus === "checking" ? "Checking..." : "Check Server Status"}
                                </button>
                                {keyStatus !== "idle" && (
                                    <span style={{
                                        color: keyStatus === "found" ? "var(--text-positive)" : (keyStatus === "mismatch" ? "var(--text-warning)" : "var(--text-danger)"),
                                        fontWeight: "bold"
                                    }}>
                                        {keyStatus === "found" ? "Key Found on Server" : (keyStatus === "mismatch" ? "Key Mismatch" : "Key Not Found on Server")}
                                    </span>
                                )}
                            </div>
                            <p style={{ marginTop: "8px", fontSize: '12px', color: 'var(--text-muted)' }}>
                                Check if your public key is correctly registered on the PGPCord server.
                            </p>
                        </div>

                        <div style={{ marginTop: "16px" }}>
                            <button
                                onClick={handleDeleteKeys}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    border: "none",
                                    background: "var(--button-danger-background)",
                                    color: "var(--white)",
                                    cursor: "pointer"
                                }}
                            >
                                Delete Keys & Account
                            </button>
                        </div>
                        <p style={{ marginTop: "8px", fontSize: '12px', color: 'var(--text-muted)' }}>
                            Publishing opens an external website. Exporting downloads a JSON file with your private key - keep it safe! Deleting will remove keys locally and open the deletion page.
                        </p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Security Settings</h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label htmlFor="cache-duration" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', color: 'var(--header-secondary)' }}>Passphrase Cache Duration</label>
                            <select
                                id="cache-duration"
                                value={settings.cacheDuration}
                                onChange={(e) => updateSettings({ cacheDuration: e.target.value as CacheDuration })}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: 'var(--input-background)',
                                    color: 'var(--text-normal)'
                                }}
                            >
                                <option value="session">Cache for session</option>
                                <option value="time">Cache for a set time</option>
                                <option value="none">Do not cache (most secure)</option>
                            </select>
                        </div>

                        {settings.cacheDuration === 'time' && (
                            <div style={{ marginBottom: '16px' }}>
                                <label htmlFor="cache-time" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', color: 'var(--header-secondary)' }}>Cache duration (minutes)</label>
                                <input
                                    id="cache-time"
                                    type="number"
                                    min="1"
                                    value={settings.cacheTimeMinutes}
                                    onChange={(e) => updateSettings({ cacheTimeMinutes: parseInt(e.target.value, 10) })}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: 'none',
                                        backgroundColor: 'var(--input-background)',
                                        color: 'var(--text-normal)'
                                    }}
                                />
                            </div>
                        )}

                        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Determines how long your unlocked private key is kept in memory.</p>
                    </div>
                </div>
            ) : (
                !isGenerating && (
                    <div>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Generate New Keys</h3>
                        <p style={{ marginBottom: '16px', color: 'var(--text-normal)' }}>
                            To get started, generate a new PGP key pair.
                            <br />
                            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>You will lose access to your encrypted messages if you forget your passphrase.</span>
                        </p>

                        <div style={{ marginBottom: '16px' }}>
                            <label htmlFor="passphrase" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', color: 'var(--header-secondary)' }}>Passphrase</label>
                            <input
                                id="passphrase"
                                type="password"
                                value={passphrase}
                                onChange={(e) => setPassphrase(e.target.value)}
                                placeholder="Enter a strong passphrase"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    backgroundColor: 'var(--input-background)',
                                    color: 'var(--text-normal)'
                                }}
                            />
                        </div>

                        <button
                            onClick={handleGenerateKeys}
                            disabled={!passphrase || isGenerating}
                            style={{
                                padding: "8px 16px",
                                borderRadius: "4px",
                                border: "none",
                                background: "var(--brand-experiment)",
                                color: "var(--interactive-active)",
                                cursor: "pointer",
                                opacity: (!passphrase || isGenerating) ? 0.5 : 1
                            }}
                        >
                            Generate Keys
                        </button>

                        <div style={{ marginTop: "16px", borderTop: "1px solid var(--background-modifier-accent)", paddingTop: "16px" }}>
                            <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Or Import Existing Keys</h4>
                            <label
                                style={{
                                    display: "inline-block",
                                    cursor: "pointer",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    background: "var(--button-secondary-background)",
                                    color: "var(--text-normal)"
                                }}
                            >
                                Import Keys from JSON
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={initiateImport}
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                />
                            </label>
                        </div>
                    </div>
                )
            )}

            {isGenerating && (
                <div style={{ marginTop: '24px' }}>
                    <p style={{ color: 'var(--text-normal)' }}>Generating keys... This may take a moment. Your browser may become unresponsive.</p>
                </div>
            )}
        </div>
    );
};
