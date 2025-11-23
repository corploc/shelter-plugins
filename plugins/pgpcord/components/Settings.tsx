import { createSignal, Show, onMount } from "solid-js";
import { generateKeyPair, saveKeyPairToLocalStorage, loadKeyPairFromLocalStorage } from "../lib/crypto";
import { UserKeyPair, PluginSettings, CacheDuration } from "../lib/types";
import classes from "./settings.scss";

// Assuming Shelter's data API is available globally via `shelter`
declare const shelter: any;

const defaultSettings: PluginSettings = {
  cacheDuration: 'session',
  cacheTimeMinutes: 15,
};

export default () => {
  const [keyPair, setKeyPair] = createSignal<UserKeyPair | null>(null);
  const [passphrase, setPassphrase] = createSignal("");
  const [isGenerating, setIsGenerating] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  
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

  const handlePublishKey = () => {
    window.open("https://pgpcord.zerostats.dev/upload", "_blank");
  };

  const handleExportKeys = () => {
      const keys = keyPair();
      if (!keys) return;
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(keys, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "pgpcord_keys.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
  };

  const handleImportKeys = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input.files || input.files.length === 0) return;

      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {
          try {
              const content = e.target?.result as string;
              const parsed = JSON.parse(content);
              
              if (parsed.publicKey && parsed.privateKey && parsed.keyId) {
                  saveKeyPairToLocalStorage(parsed);
                  setKeyPair(parsed);
                  setError(null);
                  alert("Keys imported successfully!");
              } else {
                  throw new Error("Invalid key file format.");
              }
          } catch (err) {
              console.error("Import failed:", err);
              setError("Failed to import keys. Invalid file format.");
          }
      };
      
      reader.readAsText(file);
      // Reset input
      input.value = "";
  };

  return (
    <div class={classes.container}>
      <h2 class={classes.header}>PGPCord Settings</h2>

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
                <br/>
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
                      <input type="file" accept=".json" onChange={handleImportKeys} style={{ display: "none" }} />
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
                <label class={classes.label}>Public Key</label>
                <div class={classes.codeBlock}>{kp.publicKey}</div>
              </div>
              
              <div class={classes.inputGroup} style={{ display: "flex", gap: "8px" }}>
                 <button class={classes.secondaryButton} onClick={handlePublishKey}>
                    Publish Public Key
                 </button>
                 <button class={classes.secondaryButton} onClick={handleExportKeys}>
                    Export Keys Backup
                 </button>
              </div>
              <p class={classes.muted}>
                   Publishing opens an external website. Exporting downloads a JSON file with your private key - keep it safe!
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
