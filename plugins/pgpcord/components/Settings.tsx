import { createSignal, Show, onMount } from "solid-js";
import { generateKeyPair, saveKeyPairToLocalStorage, loadKeyPairFromLocalStorage } from "../lib/crypto";
import { UserKeyPair, PluginSettings, CacheDuration } from "../lib/types";

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
  const [settings, setSettings] = createSignal<PluginSettings>(defaultSettings);

  onMount(() => {
    const loadedKeys = loadKeyPairFromLocalStorage();
    if (loadedKeys) {
      setKeyPair(loadedKeys);
    }
    const loadedSettings = shelter.plugin.store.pgpcord_settings;
    if (loadedSettings) {
      setSettings(loadedSettings);
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
    // Redirect to external site for key publishing
    window.open("https://pgpcord.zerostats.dev/upload", "_blank");
  };

  const handleSettingsChange = (partialSettings: Partial<PluginSettings>) => {
    const newSettings = { ...settings(), ...partialSettings };
    setSettings(newSettings);
    shelter.plugin.store.pgpcord_settings = newSettings;
  };

  return (
    <div>
      <h2>PGPCord Settings</h2>

      <Show when={error()}>
        <div style={{ color: "red", "margin-bottom": "1em" }}>
          <p><strong>Error:</strong> {error()}</p>
        </div>
      </Show>

      <Show when={keyPair()}
        fallback={
          <Show when={!isGenerating()}>
            <div>
              <h3>Generate New Keys</h3>
              <p>To get started, generate a new PGP key pair. <strong>You will lose access to your encrypted messages if you forget your passphrase.</strong></p>
              <div>
                <label for="passphrase">Passphrase:</label>
                <input id="passphrase" type="password" value={passphrase()} onInput={(e) => setPassphrase(e.currentTarget.value)} placeholder="Enter a strong passphrase" />
              </div>
              <button onClick={handleGenerateKeys} disabled={!passphrase() || isGenerating()}>Generate Keys</button>
            </div>
          </Show>
        }
      >
        {(kp) => (
          <div>
            <h3>Your PGP Keys</h3>
            <div>
              <h4>Public Key</h4>
              <pre>{kp.publicKey}</pre>
            </div>
            
            <div style={{ "margin-top": "1em", "margin-bottom": "1em" }}>
               <button onClick={handlePublishKey}>Publish Public Key to Directory</button>
               <p style={{ "font-size": "0.8em", "color": "var(--text-muted)" }}>
                 This will open an external website where you can authenticate with Discord to publish your key.
               </p>
            </div>

            <hr />

            <h3>Security Settings</h3>
            <div>
              <label for="cache-duration">Passphrase Cache Duration</label>
              <select
                id="cache-duration"
                value={settings().cacheDuration}
                onChange={(e) => handleSettingsChange({ cacheDuration: e.currentTarget.value as CacheDuration })}
              >
                <option value="session">Cache for session</option>
                <option value="time">Cache for a set time</option>
                <option value="none">Do not cache (most secure)</option>
              </select>
              <Show when={settings().cacheDuration === 'time'}>
                <div style={{ "margin-top": "0.5em" }}>
                  <label for="cache-time">Cache duration (minutes):</label>
                  <input
                    id="cache-time"
                    type="number"
                    min="1"
                    value={settings().cacheTimeMinutes}
                    onInput={(e) => handleSettingsChange({ cacheTimeMinutes: parseInt(e.currentTarget.value, 10) })}
                  />
                </div>
              </Show>
              <p>Determines how long your unlocked private key is kept in memory.</p>
            </div>

          </div>
        )}
      </Show>

      <Show when={isGenerating()}>
        <div>
          <p>Generating keys... This may take a moment. Your browser may become unresponsive.</p>
        </div>
      </Show>
    </div>
  );
};
