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
         <ModalHeader close={closeModal}>Choisir la méthode d'upload</ModalHeader>
         <ModalBody>
            <div class={styles.choiceContent}>
               <p class={styles.choiceTitle}>
                  🐱 Vous êtes sur le point d'uploader {fileCount} fichier{fileCount > 1 ? 's' : ''}
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
                           <li>✅ Jusqu'à 200MB par fichier</li>
                           <li>✅ Lien copié automatiquement</li>
                           <li>✅ Historique des uploads</li>
                           <li>⏱️ Expire après 72h</li>
                        </ul>
                     </div>
                     <div class={styles.optionBadge}>Recommandé</div>
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
                        <h3>Discord (Natif)</h3>
                        <ul>
                           <li>✅ Intégré à Discord</li>
                           <li>✅ Permanent (tant que message existe)</li>
                           <li>⚠️ Limite de 25MB (ou 500MB Nitro)</li>
                           <li>⚠️ Pas d'historique</li>
                        </ul>
                     </div>
                  </button>
               </div>
            </div>
         </ModalBody>
         <ModalFooter>
            <div class={styles.choiceFooter}>
               <p class={styles.choiceHint}>💡 Cliquez sur votre choix ci-dessus ou appuyez sur Échap pour annuler</p>
            </div>
         </ModalFooter>
      </ModalRoot>
   );
}
