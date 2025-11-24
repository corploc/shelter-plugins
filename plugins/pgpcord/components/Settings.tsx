import { createSignal, Show, onMount } from "solid-js";
import { generateKeyPair, saveKeyPairToLocalStorage, loadKeyPairFromLocalStorage, encryptPrivateKey, decryptPrivateKey } from "../lib/crypto";
import { UserKeyPair, PluginSettings, CacheDuration } from "../lib/types";
import { checkCurrentUserKey } from "../lib/api";
import classes from "./settings.scss";

// Assuming Shelter's data API is available globally via `shelter`
declare const shelter: any;

// Rate limiting - module level to persist across re-renders
let lastCheckTime = 0;
const CHECK_COOLDOWN_MS = 2000; // 2 seconds between checks

const defaultSettings: PluginSettings = {
  cacheDuration: 'session',
  cacheTimeMinutes: 15,
  lastKnownKeyStatus: 'idle',
};

export default () => {
  const [keyPair, setKeyPair] = createSignal<UserKeyPair | null>(null);
  const [passphrase, setPassphrase] = createSignal("");
  const [isGenerating, setIsGenerating] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = createSignal(false);
  const [modalMode, setModalMode] = createSignal<"export" | "import">("export");
  const [modalPassword, setModalPassword] = createSignal("");
  const [pendingImportFile, setPendingImportFile] = createSignal<File | null>(null);
  const [showPublicKey, setShowPublicKey] = createSignal(false);

  // Use shelter store directly for settings where possible, but we need a local signal for the form
  // or we can just read/write to store.
  // For better reactivity, we can wrap store access if needed, but shelter store is reactive.

  // Initialize store defaults if needed
  if (!shelter.plugin.store.pgpcord_settings) {
    shelter.plugin.store.pgpcord_settings = defaultSettings;
  }

  const getSettings = () => shelter.plugin.store.pgpcord_settings as PluginSettings;
  const updateSettings = (partial: Partial<PluginSettings>) => {
    shelter.plugin.store.pgpcord_settings = { ...getSettings(), ...partial };
  };

  // Key status check - initialize from store
  const [keyStatus, setKeyStatus] = createSignal<"idle" | "checking" | "found" | "not_found" | "mismatch">(
    getSettings().lastKnownKeyStatus || 'idle'
  );

  onMount(() => {
    const loadedKeys = loadKeyPairFromLocalStorage();
    if (loadedKeys) {
      setKeyPair(loadedKeys);
    }
  });

  const handleGenerateKeys = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const newKeyPair = await generateKeyPair(passphrase());
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

  const handlePublishKey = async () => {
    const kp = keyPair();
    if (!kp) return;

    try {
      const response = await fetch('http://localhost:3000/api/cache-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: kp.publicKey,
          next: '/dashboard'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to cache key');
      }

      const data = await response.json();

      // Navigate to the returned redirect_url
      if (data.redirect_url) {
        window.open(`http://localhost:3000${data.redirect_url}`, '_blank');
      } else {
        throw new Error('No redirect URL returned');
      }
    } catch (err) {
      console.error('PGPCord: Failed to publish key', err);
      setError('Failed to publish key to server. Please try again.');
    }
  };

  const handleDeleteKeys = () => {
    if (confirm("Are you sure you want to delete your keys? This action cannot be undone and you will lose access to all encrypted messages.")) {
      try {
        // 1. Clear keys from localStorage
        saveKeyPairToLocalStorage(null as any);

        // 2. Clear all plugin store data
        delete shelter.plugin.store.pgpcord_keys;
        delete shelter.plugin.store.pgpcord_settings;
        delete shelter.plugin.store.pgpcord_lock_state;

        // 3. Clear any cached private keys
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem('pgpcord_cached_private_key');
          sessionStorage.removeItem('pgpcord_cache_expiry');
        }

        // 4. Reset local state
        setKeyPair(null);
        setPassphrase("");
        setKeyStatus("idle");

        // 5. Redirect to backend delete route with validate=true
        // This will handle OAuth and actual server-side deletion
        window.open("http://localhost:3000/delete?validate=true", "_blank");

        console.log("PGPCord: Local data cleared, redirecting to server deletion...");
      } catch (err) {
        console.error("PGPCord: Error during key deletion", err);
        setError("Failed to clear local data. Please try again.");
      }
    }
  };

  const initiateExport = () => {
    setModalMode("export");
    setModalPassword("");
    setShowModal(true);
  };

  const initiateImport = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    setPendingImportFile(input.files[0]);
    setModalMode("import");
    setModalPassword("");
    setShowModal(true);
    input.value = ""; // Reset input
  };

  const handleModalConfirm = async () => {
    setShowModal(false);
    const password = modalPassword();

    if (modalMode() === "export") {
      const keys = keyPair();
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

    } else if (modalMode() === "import") {
      const file = pendingImportFile();
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
            // alert("Keys imported successfully!"); // Avoid alert if possible
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

  const [copyFeedback, setCopyFeedback] = createSignal(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
      console.log("PGPCord: Public key copied to clipboard.");
    }, (err) => {
      console.error("PGPCord: Failed to copy public key", err);
    });
  };

  const normalizeKey = (key: string): string => {
    // Remove all whitespace, newlines, carriage returns, etc.
    return key.replace(/\s+/g, '').trim();
  };

  const handleCheckStatus = async () => {
    // Rate limiting guard
    const now = Date.now();
    if (now - lastCheckTime < CHECK_COOLDOWN_MS) {
      console.log(`PGPCord: Please wait ${Math.ceil((CHECK_COOLDOWN_MS - (now - lastCheckTime)) / 1000)}s before checking again`);
      return;
    }
    lastCheckTime = now;

    setKeyStatus("checking");
    try {
      const serverKeyRecord = await checkCurrentUserKey();
      const localKeys = keyPair();

      let status: "found" | "not_found" | "mismatch" = "not_found";

      if (serverKeyRecord) {
        if (localKeys) {
          // Normalize both keys before comparison
          const normalizedServerKey = normalizeKey(serverKeyRecord.public_key);
          const normalizedLocalKey = normalizeKey(localKeys.publicKey);

          if (normalizedServerKey === normalizedLocalKey) {
            status = "found";
          } else {
            status = "mismatch";
          }
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
      setKeyStatus("not_found"); // Or error state
      updateSettings({ lastKnownKeyStatus: "not_found" });
    }
  };

  return (
    <div class={classes.container}>
      <h2 class={classes.header}>PGPCord Settings</h2>

      <Show when={showModal()}>
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.85)", display: "flex", "align-items": "center", "justify-content": "center", "z-index": 9999
        }}>
          <div class={classes.section} style={{
            background: "var(--background-primary)",
            padding: "24px",
            "border-radius": "8px",
            "min-width": "320px",
            "box-shadow": "var(--elevation-high)",
            border: "1px solid var(--background-modifier-accent)"
          }}>
            <h3 class={classes.subHeader} style={{ "margin-top": 0 }}>
              {modalMode() === "export" ? "Encrypt Export" : "Decrypt Import"}
            </h3>
            <p class={classes.text} style={{ "margin-bottom": "16px" }}>
              {modalMode() === "export"
                ? "Enter a password to encrypt your private key (Recommended):"
                : "Enter the password for this key file (leave empty if none):"}
            </p>
            <input
              class={classes.input}
              type="password"
              value={modalPassword()}
              onInput={(e) => setModalPassword(e.currentTarget.value)}
              placeholder="Password"
              style={{ "margin-bottom": "24px", "background-color": "var(--input-background)" }}
            />
            <div style={{ display: "flex", gap: "12px", "justify-content": "flex-end" }}>
              <button class={classes.secondaryButton} onClick={() => setShowModal(false)}>Cancel</button>
              <button class={classes.button} onClick={handleModalConfirm}>
                {modalMode() === "export" ? "Export" : "Import"}
              </button>
            </div>
          </div>
        </div>
      </Show>

      <Show when={error()}>
        <div class={classes.error}>
          <strong>Error: </strong> {error()}
        </div>
      </Show>

      <Show when={keyPair()}
        fallback={
          <Show when={!isGenerating()}>
            <div class={classes.section}>
              <h3 class={classes.subHeader}>Generate New Keys</h3>
              <p class={classes.text}>
                To get started, generate a new PGP key pair.
                <br />
                <span class={classes.muted}>You will lose access to your encrypted messages if you forget your passphrase.</span>
              </p>

              <div class={classes.inputGroup}>
                <label class={classes.label} for="passphrase">Passphrase</label>
                <input
                  id="passphrase"
                  class={classes.input}
                  type="password"
                  value={passphrase()}
                  onInput={(e) => setPassphrase(e.currentTarget.value)}
                  placeholder="Enter a strong passphrase"
                />
              </div>

              <button
                class={classes.button}
                onClick={handleGenerateKeys}
                disabled={!passphrase() || isGenerating()}
              >
                Generate Keys
              </button>

              <div class={classes.inputGroup} style={{ "margin-top": "16px", "border-top": "1px solid var(--background-modifier-accent)", "padding-top": "16px" }}>
                <h4 class={classes.subHeader}>Or Import Existing Keys</h4>
                <label class={classes.secondaryButton} style={{ display: "inline-block", cursor: "pointer" }}>
                  Import Keys from JSON
                  <input type="file" accept=".json" onChange={initiateImport} style={{ display: "none" }} />
                </label>
              </div>
            </div>
          </Show>
        }
      >
        {(kp) => (
          <div>
            <div class={classes.section}>
              <h3 class={classes.subHeader}>Your PGP Keys</h3>

              <div class={classes.inputGroup}>
                <div style={{ display: "flex", "justify-content": "space-between", "align-items": "center", "margin-bottom": "8px" }}>
                  <label class={classes.label}>Public Key</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button class={classes.copyButton} onClick={() => setShowPublicKey(!showPublicKey())}>
                      {showPublicKey() ? "Hide" : "Show"}
                    </button>
                    <Show when={showPublicKey()}>
                      <button class={classes.copyButton} onClick={() => handleCopy(kp.publicKey)}>
                        {copyFeedback() ? "Copied!" : "Copy"}
                      </button>
                    </Show>
                  </div>
                </div>
                <Show when={showPublicKey()}>
                  <pre class={classes.codeBlock}><code>{kp.publicKey}</code></pre>
                </Show>
              </div>

              <div class={classes.inputGroup} style={{ display: "flex", gap: "8px" }}>
                <button class={classes.secondaryButton} onClick={handlePublishKey}>
                  Publish Public Key
                </button>
                <button class={classes.secondaryButton} onClick={initiateExport}>
                  Export Keys Backup
                </button>
              </div>

              <div class={classes.inputGroup} style={{ "margin-top": "16px", "border-top": "1px solid var(--background-modifier-accent)", "padding-top": "16px" }}>
                <h4 class={classes.subHeader}>Account Status</h4>
                <div style={{ display: "flex", "align-items": "center", gap: "12px" }}>
                  <button class={classes.secondaryButton} onClick={handleCheckStatus} disabled={keyStatus() === "checking"}>
                    {keyStatus() === "checking" ? "Checking..." : "Check Server Status"}
                  </button>
                  <Show when={keyStatus() !== "idle"}>
                    <span style={{
                      color: keyStatus() === "found" ? "var(--text-positive)" : (keyStatus() === "mismatch" ? "var(--text-warning)" : "var(--text-danger)"),
                      "font-weight": "bold"
                    }}>
                      {keyStatus() === "found" ? "Key Found on Server" : (keyStatus() === "mismatch" ? "Key Mismatch" : "Key Not Found on Server")}
                    </span>
                  </Show>
                </div>
                <p class={classes.muted} style={{ "margin-top": "8px" }}>
                  Check if your public key is correctly registered on the PGPCord server.
                </p>
              </div>

              <div class={classes.inputGroup} style={{ "margin-top": "8px" }}>
                <button class={classes.secondaryButton} style={{ "background-color": "var(--button-danger-background)", color: "var(--white)" }} onClick={handleDeleteKeys}>
                  Delete Keys & Account
                </button>
              </div>
              <p class={classes.muted}>
                Publishing opens an external website. Exporting downloads a JSON file with your private key - keep it safe! Deleting will remove keys locally and open the deletion page.
              </p>
            </div>

            <div class={classes.section}>
              <h3 class={classes.subHeader}>Security Settings</h3>

              <div class={classes.inputGroup}>
                <label class={classes.label} for="cache-duration">Passphrase Cache Duration</label>
                <select
                  id="cache-duration"
                  class={classes.select}
                  value={getSettings().cacheDuration}
                  onChange={(e) => updateSettings({ cacheDuration: e.currentTarget.value as CacheDuration })}
                >
                  <option value="session">Cache for session</option>
                  <option value="time">Cache for a set time</option>
                  <option value="none">Do not cache (most secure)</option>
                </select>
              </div>

              <Show when={getSettings().cacheDuration === 'time'}>
                <div class={classes.inputGroup}>
                  <label class={classes.label} for="cache-time">Cache duration (minutes)</label>
                  <input
                    id="cache-time"
                    class={classes.input}
                    type="number"
                    min="1"
                    value={getSettings().cacheTimeMinutes}
                    onInput={(e) => updateSettings({ cacheTimeMinutes: parseInt(e.currentTarget.value, 10) })}
                  />
                </div>
              </Show>

              <p class={classes.muted}>Determines how long your unlocked private key is kept in memory.</p>
            </div>

          </div>
        )}
      </Show>

      <Show when={isGenerating()}>
        <div class={classes.section}>
          <p class={classes.text}>Generating keys... This may take a moment. Your browser may become unresponsive.</p>
        </div>
      </Show>
    </div>
  );
};
