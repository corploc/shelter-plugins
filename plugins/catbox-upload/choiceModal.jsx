import styles from "./modal.jsx.scss";

const {
   ui: {
      ModalRoot,
      ModalHeader,
      ModalBody,
      ModalFooter,
      ModalSizes,
      Button,
      ButtonColors,
      ButtonSizes,
   },
   solid: { createSignal, Show },
} = shelter;

export function ChoiceModal(closeModal, files, onCatboxChoice, onDiscordChoice) {
   const fileCount = files.length;
   const fileNames = files.map(f => f.name).join(", ");

   return (
      <ModalRoot size={ModalSizes.SMALL} class={styles.choiceModal}>
         <ModalHeader close={closeModal}>Choose upload method</ModalHeader>
         <ModalBody>
            <div class={styles.choiceContent}>
               <p class={styles.choiceTitle}>
                  🐱 You are about to upload {fileCount} file{fileCount > 1 ? 's' : ''}
               </p>
               <p class={styles.choiceSubtitle}>{fileNames}</p>
               
               <div class={styles.choiceOptions}>
                  <button
                     class={styles.choiceOption}
                     onClick={() => {
                        closeModal();
                        onCatboxChoice();
                     }}
                  >
                     <div class={styles.optionIcon}>🐱</div>
                     <div class={styles.optionInfo}>
                        <h3>Catbox (Litterbox)</h3>
                        <ul>
                           <li>✅ Up to 1GB per file</li>
                           <li>✅ Link copied automatically</li>
                           <li>✅ Upload history</li>
                           <li>⏱️ Configurable expiration (1h - 72h)</li>
                        </ul>
                     </div>
                     <div class={styles.optionBadge}>Recommended</div>
                  </button>

                  <button
                     class={styles.choiceOption}
                     onClick={() => {
                        closeModal();
                        onDiscordChoice();
                     }}
                  >
                     <div class={styles.optionIcon}>💬</div>
                     <div class={styles.optionInfo}>
                        <h3>Discord (Native)</h3>
                        <ul>
                           <li>✅ Integrated into Discord</li>
                           <li>✅ Permanent (as long as message exists)</li>
                           <li>⚠️ 25MB limit (or 500MB Nitro)</li>
                           <li>⚠️ No history</li>
                        </ul>
                     </div>
                  </button>
               </div>
            </div>
         </ModalBody>
         <ModalFooter>
            <div class={styles.choiceFooter}>
               <p class={styles.choiceHint}>💡 Click your choice above or press Esc to cancel</p>
            </div>
         </ModalFooter>
      </ModalRoot>
   );
}
