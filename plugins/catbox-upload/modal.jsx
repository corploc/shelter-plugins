import styles from "./modal.jsx.scss";
import { formatFileSize, getFilePreview, uploadFiles, getTimeRemaining, formatUploadDate, hasUserHash, deleteFileFromCatbox } from "./utils";

const {
   ui: {
      ModalRoot,
      ModalHeader,
      ModalBody,
      ModalFooter,
      ModalSizes,
      showToast,
      Button,
      ButtonColors,
      ButtonSizes,
   },
   solid: { createSignal, createEffect, Show, For },
   util: { log, getFiber },
   plugin: { store },
} = shelter;

export function UploadModal(closeModal, initialFiles = []) {
   const [files, setFiles] = createSignal(initialFiles);
   const [isDragOver, setIsDragOver] = createSignal(false);
   const [previews, setPreviews] = createSignal([]);
   const [isUploading, setIsUploading] = createSignal(false);
   const [uploadProgress, setUploadProgress] = createSignal(0);
   const [showHistory, setShowHistory] = createSignal(false);
   const [uploadAnonymous, setUploadAnonymous] = createSignal(false);

   // Initialize upload history from store
   store.uploadHistory ??= [];

   let fileInputRef;

   // Function to copy to clipboard
   const copyToClipboard = async (text) => {
      try {
         await navigator.clipboard.writeText(text);
         showToast({
            title: "Copié!",
            content: "Le lien a été copié dans le presse-papier",
         });
      } catch (err) {
         log("Failed to copy to clipboard", "error");
      }
   };

   // Function to delete from history
   const deleteFromHistory = async (index) => {
      const item = store.uploadHistory[index];
      
      if (item.deletable && item.filenameOnServer) {
         // Delete from Catbox server
         try {
            await deleteFileFromCatbox(item.filenameOnServer);
            showToast({
               title: "Fichier supprimé",
               content: "Le fichier a été supprimé de Catbox",
            });
         } catch (error) {
            log("Failed to delete from Catbox: " + error.message, "error");
            showToast({
               title: "Erreur de suppression",
               content: "Impossible de supprimer le fichier du serveur",
            });
            return;
         }
      }
      
      // Remove from history
      store.uploadHistory = store.uploadHistory.filter((_, i) => i !== index);
   };

   const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
   };

   const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
   };

   const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      if (!isUploading()) {
         const droppedFiles = Array.from(e.dataTransfer.files);
         setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
      }
   };

   const handleFileChange = (e) => {
      if (e.target.files && !isUploading()) {
         const selectedFiles = Array.from(e.target.files);
         setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      }
   };

   const handleRemoveFile = (index) => {
      if (!isUploading()) {
         setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
         setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
      }
   };

   const handleUploadClick = () => {
      if (!isUploading()) {
         fileInputRef.click();
      }
   };

   const handleConfirm = async () => {
      setIsUploading(true);
      setUploadProgress(0);

      const { uploadedFiles, previewsToSave, uploadHistory } = await uploadFiles(files(), previews(), (progress) => {
         setUploadProgress(progress * 100);
      }, uploadAnonymous());

      const uploadedUrls = (await uploadedFiles)
         .filter((result) => result.status === "fulfilled")
         .map((result) => result.value);

      const failedUploads = (await uploadedFiles)
         .filter((result) => result.status === "rejected")
         .map((result) => result.reason);

      if (failedUploads.length == files().length) {
         showToast({
            title: "Upload échoué!",
            content: "Tous les fichiers n'ont pas pu être uploadés",
         });

         for (const error of failedUploads) {
            log("Catbox Upload - " + error, "error");
         }
      } else if (failedUploads.length > 0) {
         showToast({
            title: "Upload partiel!",
            content: "Certains fichiers n'ont pas pu être uploadés",
         });

         for (const error of failedUploads) {
            log("Catbox Upload - " + error, "error");
         }
      } else {
         showToast({
            title: "Upload réussi! 🎉",
            content: "Liens copiés dans le presse-papier",
         });

         store.previews = { ...store.previews, ...previewsToSave };
         
         // Save to history
         store.uploadHistory = [...uploadHistory, ...store.uploadHistory].slice(0, 50); // Keep last 50

         const fiber = getFiber(document.querySelector('[class*="slateContainer"]'));
         const editor = fiber.child.pendingProps.editor;

         // Copy all URLs to clipboard
         const allUrls = uploadedUrls.join(" ");
         await copyToClipboard(allUrls);

         for (let i = 0; i < uploadedUrls.length; i++) {
            const url = uploadedUrls[i];
            editor.insertText(url);
            if (i < uploadedUrls.length - 1) {
               editor.insertText(" ");
            }
         }
      }

      closeModal();
      setIsUploading(false);
   };

   createEffect(() => {
      const newFiles = files();
      Promise.all(newFiles.map((file) => getFilePreview(file))).then((newPreviews) => {
         setPreviews(newPreviews);
      });
   });

   return (
      <ModalRoot size={ModalSizes.MEDIUM} class={styles.uploadModal}>
         <ModalHeader close={closeModal}>
            <div class={styles.headerContent}>
               <span>Upload to Litterbox</span>
               <button 
                  class={styles.historyToggle}
                  onClick={() => setShowHistory(!showHistory())}
               >
                  {showHistory() ? "📤 Upload" : "📜 Historique"}
               </button>
            </div>
         </ModalHeader>
         <ModalBody>
            <Show when={!showHistory()}>
               <div
                  class={`${styles.uploadArea} ${isDragOver() ? styles.dragOver : ""} ${isUploading() ? styles.uploading : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleUploadClick}
               >
                  <Show when={!isUploading()} fallback={<p>Upload en cours... Veuillez patienter</p>}>
                     <p>🐱 Glissez-déposez des fichiers ici ou cliquez pour sélectionner</p>
                     <p class={styles.uploadInfo}>Taille maximale : 200MB par fichier • Durée : 72h</p>
                  </Show>
                  <input
                     type="file"
                     ref={fileInputRef}
                     onChange={handleFileChange}
                     multiple
                     hidden
                     disabled={isUploading()}
                  />
               </div>
               <Show when={isUploading()}>
                  <div class={styles.progressBar}>
                     <div class={styles.progressFill} style={{ width: `${uploadProgress()}%` }}></div>
                  </div>
               </Show>
               
               <Show when={hasUserHash() && files().length > 0}>
                  <div class={styles.anonymousToggle}>
                     <label class={styles.anonymousLabel}>
                        <input
                           type="checkbox"
                           checked={uploadAnonymous()}
                           onChange={(e) => setUploadAnonymous(e.target.checked)}
                           disabled={isUploading()}
                        />
                        <span class={styles.anonymousCheckbox}></span>
                        <span class={styles.anonymousText}>
                           🕶️ Upload anonyme (Litterbox 72h)
                           <br />
                           <small>Sinon : Catbox permanent avec votre compte</small>
                        </span>
                     </label>
                  </div>
               </Show>

               <div class={styles.previewArea}>
                  <For each={files()}>
                     {(file, index) => (
                        <div class={styles.previewItem}>
                           {file.type.startsWith("image/") && (
                              <img src={previews()[index()]} alt={file.name} class={styles.previewImage} />
                           )}
                           {file.type.startsWith("video/") && (
                              <img src={previews()[index()]} alt={file.name} class={styles.previewVideo} />
                           )}
                           {!file.type.startsWith("image/") && !file.type.startsWith("video/") && (
                              <div class={styles.previewIcon}>📄</div>
                           )}
                           <div class={styles.previewItemInfo}>
                              <p>{file.name}</p>
                              <p>{formatFileSize(file.size)}</p>
                           </div>
                           <button
                              class={styles.removeButton}
                              onClick={() => handleRemoveFile(index())}
                              disabled={isUploading()}
                           >
                              <svg
                                 aria-hidden="true"
                                 role="img"
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="24"
                                 height="24"
                                 fill="none"
                                 viewBox="0 0 24 24"
                              >
                                 <path
                                    fill="currentColor"
                                    d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z"
                                    class=""
                                 ></path>
                                 <path
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z"
                                    clip-rule="evenodd"
                                    class=""
                                 ></path>
                              </svg>
                           </button>
                        </div>
                     )}
                  </For>
               </div>
            </Show>

            <Show when={showHistory()}>
               <div class={styles.historyContainer}>
                  <Show when={store.uploadHistory.length === 0}>
                     <div class={styles.emptyHistory}>
                        <p>📭 Aucun upload dans l'historique</p>
                        <p class={styles.uploadInfo}>Vos uploads apparaîtront ici</p>
                     </div>
                  </Show>
                  <div class={styles.historyList}>
                     <For each={store.uploadHistory}>
                        {(item, index) => {
                           const timeRemaining = item.anonymous ? getTimeRemaining(item.uploadDate) : null;
                           
                           return (
                              <div class={styles.historyItem}>
                                 <Show when={item.preview}>
                                    <img src={item.preview} class={styles.historyPreview} alt={item.filename} />
                                 </Show>
                                 <div class={styles.historyInfo}>
                                    <div class={styles.historyHeader}>
                                       <p class={styles.historyFilename}>{item.filename}</p>
                                       <span class={`${styles.badge} ${item.anonymous ? styles.badgeAnonymous : styles.badgeAuth}`}>
                                          {item.anonymous ? "🔓 Anonyme" : "🔐 Authentifié"}
                                       </span>
                                    </div>
                                    <p class={styles.historyMeta}>
                                       {formatFileSize(item.size)} • {formatUploadDate(item.uploadDate)}
                                    </p>
                                    <Show when={item.anonymous && timeRemaining}>
                                       <p class={styles.historyExpiry}>
                                          ⏱️ {timeRemaining}
                                       </p>
                                    </Show>
                                    <Show when={!item.anonymous}>
                                       <p class={styles.historyPermanent}>
                                          ♾️ Permanent
                                       </p>
                                    </Show>
                                 </div>
                                 <div class={styles.historyActions}>
                                    <button
                                       class={styles.copyButton}
                                       onClick={() => copyToClipboard(item.url)}
                                       title="Copier le lien"
                                    >
                                       📋
                                    </button>
                                    <Show when={item.deletable}>
                                       <button
                                          class={styles.deleteButton}
                                          onClick={() => deleteFromHistory(index())}
                                          title="Supprimer du serveur et de l'historique"
                                       >
                                          🗑️
                                       </button>
                                    </Show>
                                    <Show when={!item.deletable}>
                                       <button
                                          class={`${styles.deleteButton} ${styles.buttonDisabled}`}
                                          disabled
                                          title="Les uploads anonymes ne peuvent pas être supprimés"
                                       >
                                          🔒
                                       </button>
                                    </Show>
                                 </div>
                              </div>
                           );
                        }}
                     </For>
                  </div>
               </div>
            </Show>
         </ModalBody>
         <ModalFooter>
            <div class={styles.footer}>
               <Button
                  disabled={isUploading()}
                  size={ButtonSizes.MEDIUM}
                  color={ButtonColors.SECONDARY}
                  onClick={() => (isUploading() ? null : closeModal())}
               >
                  Cancel
               </Button>
               <Button
                  disabled={isUploading() || files().length === 0}
                  size={ButtonSizes.MEDIUM}
                  color={ButtonColors.BRAND}
                  onClick={handleConfirm}
               >
                  {isUploading() ? "Uploading..." : "Upload"}
               </Button>
            </div>
         </ModalFooter>
      </ModalRoot>
   );
}
