const { observeDom } = shelter.plugin.scoped;

const {
   ui: { openModal, showToast, Header, HeaderTags, Text, TextBox, Button, ButtonSizes, ButtonColors, focusring },
   plugin,
} = shelter;

const { subscribe } = shelter.plugin.scoped.flux;

import { UploadModal } from "./modal";
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

export function onLoad() {
   plugin.store.userhash ??= "";
   plugin.store.previews ??= {};

   updateConfig();

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
