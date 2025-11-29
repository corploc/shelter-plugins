const { observeDom } = shelter.plugin.scoped;

const {
   ui: { openModal, showToast, Header, HeaderTags, Text, TextBox, Button, ButtonSizes, ButtonColors, focusring },
   plugin,
} = shelter;

const { subscribe } = shelter.plugin.scoped.flux;

import { UploadModal } from "./modal";
import { ChoiceModal } from "./choiceModal";
import { updateUserHash } from "./utils";
import uploadIcon from "./uploadIcon";

import classes from "./modal.jsx.scss";

function updateConfig() {
   updateUserHash(plugin.store.userhash);
}

function uploadButton() {
   return (
      <button
         use:focusring
         class={classes.replacedButton}
         onClick={() => {
            openModal((p) => UploadModal(p.close));
         }}
      >
         {uploadIcon}
      </button>
   );
}

let interceptState = {
   pasteEnabled: false,
   fileInputEnabled: false
};

function handlePaste(event) {
   const isPaste = event.type === 'paste';
   const isDrop = event.type === 'drop';
   
   if (isPaste && !interceptState.pasteEnabled) return;
   if (isDrop && !interceptState.fileInputEnabled) return;
   
   const items = isPaste ? event.clipboardData?.items : event.dataTransfer?.items;
   if (!items) return;

   const files = [];
   for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.kind === 'file') {
         const file = item.getAsFile();
         if (file) files.push(file);
      }
   }

   if (files.length > 0) {
      event.preventDefault();
      event.stopPropagation();
      
      openModal((p) => ChoiceModal(
         p.close,
         files,
         // Catbox choice
         () => {
            openModal((p2) => UploadModal(p2.close, files));
         },
         // Discord choice
         () => {
            if (isPaste) {
               // Re-trigger the paste event without interception
               interceptState.pasteEnabled = false;
               setTimeout(() => {
                  const textarea = document.querySelector('[class*="textArea"]');
                  if (textarea) {
                     const newEvent = new ClipboardEvent('paste', {
                        clipboardData: event.clipboardData,
                        bubbles: true,
                        cancelable: true
                     });
                     textarea.dispatchEvent(newEvent);
                  }
                  interceptState.pasteEnabled = plugin.store.interceptPaste;
               }, 100);
            } else if (isDrop) {
               // For drops, re-trigger through file input
               interceptState.fileInputEnabled = false;
               setTimeout(() => {
                  const input = document.querySelector('input[type="file"]');
                  if (input) {
                     const dataTransfer = new DataTransfer();
                     files.forEach(file => dataTransfer.items.add(file));
                     input.files = dataTransfer.files;
                     input.dispatchEvent(new Event('change', { bubbles: true }));
                     input.dispatchEvent(new Event('input', { bubbles: true }));
                  }
                  interceptState.fileInputEnabled = plugin.store.interceptFileInput;
               }, 100);
            }
         }
      ));
   }
}

function handleFileInput(event) {
   if (!interceptState.fileInputEnabled) return;
   
   const input = event.target;
   if (!input.files || input.files.length === 0) return;
   
   // Check if this is Discord's file input
   if (!input.closest('[class*="channelTextArea"]') && !input.closest('[class*="attachButton"]')) return;

   const files = Array.from(input.files);
   const dataTransfer = new DataTransfer();
   files.forEach(file => dataTransfer.items.add(file));
   
   event.preventDefault();
   event.stopPropagation();
   
   openModal((p) => ChoiceModal(
      p.close,
      files,
      // Catbox choice
      () => {
         openModal((p2) => UploadModal(p2.close, files));
         input.value = ''; // Clear the input
      },
      // Discord choice
      () => {
         input.value = '';
         interceptState.fileInputEnabled = false;
         setTimeout(() => {
            input.files = dataTransfer.files;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.dispatchEvent(new Event('input', { bubbles: true }));
            setTimeout(() => {
               interceptState.fileInputEnabled = plugin.store.interceptFileInput;
            }, 100);
         }, 50);
      }
   ));
}

function handleKeybind(event) {
   const keybind = plugin.store.uploadKeybind || 'ctrl+shift+u';
   const keys = keybind.toLowerCase().split('+');
   
   const ctrlRequired = keys.includes('ctrl');
   const shiftRequired = keys.includes('shift');
   const altRequired = keys.includes('alt');
   const mainKey = keys.find(k => !['ctrl', 'shift', 'alt'].includes(k));
   
   if (!mainKey) return;
   
   const keyMatch = event.key.toLowerCase() === mainKey.toLowerCase();
   const ctrlMatch = !ctrlRequired || (event.ctrlKey || event.metaKey);
   const shiftMatch = !shiftRequired || event.shiftKey;
   const altMatch = !altRequired || event.altKey;
   
   if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
      event.preventDefault();
      openModal((p) => UploadModal(p.close));
   }
}

export function onLoad() {
   plugin.store.userhash ??= "";
   plugin.store.previews ??= {};
   plugin.store.interceptPaste ??= true;
   plugin.store.interceptFileInput ??= true;
   plugin.store.uploadKeybind ??= "ctrl+shift+u";

   updateConfig();

   // Enable interception
   interceptState.pasteEnabled = plugin.store.interceptPaste;
   interceptState.fileInputEnabled = plugin.store.interceptFileInput;

   // Intercept paste events
   document.addEventListener('paste', handlePaste, true);

   // Intercept drop events
   document.addEventListener('drop', handlePaste, true);
   document.addEventListener('dragover', (e) => e.preventDefault(), true);

   // Intercept file input changes
   document.addEventListener('change', handleFileInput, true);
   
   // Keybind for direct upload
   document.addEventListener('keydown', handleKeybind, true);

   subscribe("CHANNEL_SELECT", () => {
      let unobserve = observeDom('[class^="inner"] > [class^="buttons"], [class^="accessoryBarRight"]', (element) => {
         if (element.dataset.catboxUpload) return;
         unobserve();
         element.dataset.catboxUpload = true;
         element.prepend(uploadButton());
      });
      setTimeout(() => unobserve(), 2000);
   });
}

export function onUnload() {
   document.removeEventListener('paste', handlePaste, true);
   document.removeEventListener('drop', handlePaste, true);
   document.removeEventListener('dragover', (e) => e.preventDefault(), true);
   document.removeEventListener('change', handleFileInput, true);
   document.removeEventListener('keydown', handleKeybind, true);
}

export const settings = () => (
   <>
      <style>
         {`
         [class^="_modal"] {
            width: auto;
         }
         `}
      </style>
      <Text>
         This plugin uses a browser-compatible implementation inspired by <strong>node-catbox</strong> for file uploads to Litterbox.
         <br />
         <br />
         <strong>Upload Duration:</strong>
         <br />
         • All files expire after <strong>72 hours</strong> (Litterbox maximum)
         <br />
         <br />
         <strong>Features:</strong>
         <br />
         • Browser-native FormData uploads
         <br />
         • Clean API following node-catbox patterns
         <br />
         • No CORS issues in browser environment
         <br />
         <br />
         <em>Note: User Hash configuration is preserved for potential future Catbox.moe integration.</em>
         <br />
         <br />
      </Text>
      <style>
         {`
         .catbox-settings-section {
            background: var(--background-secondary);
            padding: 20px;
            border-radius: 12px;
            margin: 15px 0;
            border: 2px solid var(--background-tertiary);
         }
         .catbox-settings-section h3 {
            margin-top: 0;
            margin-bottom: 12px;
            color: var(--header-primary);
            font-size: 16px;
         }
         .catbox-settings-section p {
            color: var(--text-muted);
            font-size: 14px;
            margin-bottom: 15px;
         }
         .catbox-checkbox-container {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            background: var(--background-tertiary);
            border-radius: 8px;
            margin: 10px 0;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 2px solid transparent;
         }
         .catbox-checkbox-container:hover {
            background: var(--background-modifier-hover);
            border-color: var(--brand-experiment);
            transform: translateX(3px);
         }
         .catbox-checkbox-wrapper {
            position: relative;
            width: 48px;
            height: 26px;
            flex-shrink: 0;
         }
         .catbox-checkbox-wrapper input {
            opacity: 0;
            width: 0;
            height: 0;
            position: absolute;
         }
         .catbox-checkbox-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--background-modifier-accent);
            transition: 0.3s;
            border-radius: 34px;
         }
         .catbox-checkbox-slider:before {
            position: absolute;
            content: "";
            height: 18px;
            width: 18px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: 0.3s;
            border-radius: 50%;
         }
         .catbox-checkbox-wrapper input:checked + .catbox-checkbox-slider {
            background-color: var(--status-positive);
         }
         .catbox-checkbox-wrapper input:checked + .catbox-checkbox-slider:before {
            transform: translateX(22px);
         }
         .catbox-checkbox-label {
            flex: 1;
            color: var(--text-normal);
            font-size: 14px;
            font-weight: 500;
         }
         .catbox-keybind-input {
            background: var(--background-tertiary);
            border: 2px solid var(--background-modifier-accent);
            border-radius: 8px;
            padding: 12px 16px;
            color: var(--text-normal);
            font-size: 14px;
            font-family: 'Consolas', 'Monaco', monospace;
            text-align: center;
            font-weight: 600;
            letter-spacing: 1px;
            transition: all 0.2s ease;
         }
         .catbox-keybind-input:focus {
            outline: none;
            border-color: var(--brand-experiment);
            box-shadow: 0 0 0 3px rgba(88, 101, 242, 0.3);
         }
         .catbox-keybind-hint {
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 8px;
            font-style: italic;
         }
         `}
      </style>

      <div class="catbox-settings-section">
         <h3>🎯 Interception des uploads</h3>
         <p>Interceptez les uploads Discord pour choisir entre Catbox et Discord</p>
         
         <label class="catbox-checkbox-container">
            <div class="catbox-checkbox-wrapper">
               <input
                  type="checkbox"
                  checked={plugin.store.interceptPaste}
                  onChange={(e) => {
                     plugin.store.interceptPaste = e.target.checked;
                     interceptState.pasteEnabled = e.target.checked;
                     showToast({
                        title: "Interception Ctrl+V",
                        content: e.target.checked ? "✅ Activée" : "❌ Désactivée",
                     });
                  }}
               />
               <span class="catbox-checkbox-slider"></span>
            </div>
            <span class="catbox-checkbox-label">📋 Intercepter Ctrl+V (collage de fichiers)</span>
         </label>

         <label class="catbox-checkbox-container">
            <div class="catbox-checkbox-wrapper">
               <input
                  type="checkbox"
                  checked={plugin.store.interceptFileInput}
                  onChange={(e) => {
                     plugin.store.interceptFileInput = e.target.checked;
                     interceptState.fileInputEnabled = e.target.checked;
                     showToast({
                        title: "Interception Upload",
                        content: e.target.checked ? "✅ Activée" : "❌ Désactivée",
                     });
                  }}
               />
               <span class="catbox-checkbox-slider"></span>
            </div>
            <span class="catbox-checkbox-label">➕ Intercepter le bouton d'upload Discord</span>
         </label>
      </div>

      <div class="catbox-settings-section">
         <h3>⌨️ Raccourci clavier</h3>
         <p>Définissez un raccourci pour ouvrir directement la modale Catbox</p>
         <TextBox
            class="catbox-keybind-input"
            placeholder="ctrl+shift+u"
            value={plugin.store.uploadKeybind}
            onInput={(v) => {
               plugin.store.uploadKeybind = v.toLowerCase();
               showToast({
                  title: "Raccourci mis à jour",
                  content: `Nouveau raccourci : ${v}`,
               });
            }}
         />
         <p class="catbox-keybind-hint">
            💡 Format : ctrl+shift+u, alt+u, ctrl+alt+shift+c, etc.
         </p>
      </div>
      <br />
      <Header tag={HeaderTags.H3}>User Hash (Reserved for future use)</Header>
      <TextBox
         placeholder="Not currently used with Litterbox"
         value={plugin.store.userhash}
         onInput={(v) => {
            plugin.store.userhash = v;
            updateConfig();
         }}
         disabled
      />
      <br />
      <br />
      <Header tag={HeaderTags.H3}>Previews</Header>
      <br />
      <Button
         style={{ width: "auto" }}
         size={ButtonSizes.LARGE}
         color={ButtonColors.RED}
         onClick={() => {
            plugin.store.previews = {};
            showToast({
               title: "Catbox Upload",
               content: "Cleared cached previews.",
            });
         }}
      >
         Clear cached previews
      </Button>
      <br />
      <br />
   </>
);
