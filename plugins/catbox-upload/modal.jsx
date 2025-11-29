import styles from "./modal.jsx.scss";
import { formatFileSize, getFilePreview, getTimeRemaining, formatUploadDate, isFileTypeAllowed, FileLifetime } from "./utils";
import { uploadStatus, setUploadStatus, uploadProgress, setUploadProgress, uploadedUrls, setUploadedUrls, uploadError, setUploadError, resetUploadState, startBackgroundUpload, currentUploadFiles, currentUploadPreviews, cancelUpload } from "./state";

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
   solid: { createSignal, createEffect, Show, For, onCleanup },
   util: { log, getFiber },
} = shelter;

export function UploadModal(closeModal, initialFiles = []) {
   // If uploading, restore files from global state
   const isRestoring = uploadStatus() === "uploading";
   const [files, setFiles] = createSignal(isRestoring ? currentUploadFiles() : initialFiles);
   const [isDragOver, setIsDragOver] = createSignal(false);
   const [previews, setPreviews] = createSignal(isRestoring ? currentUploadPreviews() : []);
   // Use global state for uploading status
   // const [isUploading, setIsUploading] = createSignal(false);
   // const [uploadProgress, setUploadProgress] = createSignal(0);
   const [currentTab, setCurrentTab] = createSignal("upload"); // "upload", "history"
   const [uploadDuration, setUploadDuration] = createSignal(FileLifetime.ThreeDays);

   let isMounted = true;
   onCleanup(() => {
      isMounted = false;
   });

   // Initialize stores
   shelter.plugin.store.uploadHistory ??= [];

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
      // Remove from history
      shelter.plugin.store.uploadHistory = shelter.plugin.store.uploadHistory.filter((_, i) => i !== index);
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
      if (uploadStatus() !== "uploading") {
         const droppedFiles = Array.from(e.dataTransfer.files);
         const allowedFiles = droppedFiles.filter(isFileTypeAllowed);
         
         if (allowedFiles.length < droppedFiles.length) {
            showToast({
               title: "Fichiers ignorés",
               content: "Certains types de fichiers ne sont pas autorisés (.exe, .scr, .cpl, .doc*, .jar)",
            });
         }

         // Check for file size limit (1GB)
         const oversizedFiles = allowedFiles.filter(f => f.size > 1024 * 1024 * 1024);
         if (oversizedFiles.length > 0) {
            showToast({
               title: "Fichiers trop volumineux",
               content: `Certains fichiers dépassent la limite de 1GB et ont été ignorés.`,
            });
         }
         
         const validFiles = allowedFiles.filter(f => f.size <= 1024 * 1024 * 1024);

         if (validFiles.length > 0) {
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
         }
      }
   };

   const handleFileChange = (e) => {
      if (e.target.files && uploadStatus() !== "uploading") {
         const selectedFiles = Array.from(e.target.files);
         const allowedFiles = selectedFiles.filter(isFileTypeAllowed);

         if (allowedFiles.length < selectedFiles.length) {
            showToast({
               title: "Fichiers ignorés",
               content: "Certains types de fichiers ne sont pas autorisés (.exe, .scr, .cpl, .doc*, .jar)",
            });
         }

         // Check for file size limit (1GB)
         const oversizedFiles = allowedFiles.filter(f => f.size > 1024 * 1024 * 1024);
         if (oversizedFiles.length > 0) {
            showToast({
               title: "Fichiers trop volumineux",
               content: `Certains fichiers dépassent la limite de 1GB et ont été ignorés.`,
            });
         }

         const validFiles = allowedFiles.filter(f => f.size <= 1024 * 1024 * 1024);

         if (validFiles.length > 0) {
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
         }
      }
   };

   const handleRemoveFile = (index) => {
      if (uploadStatus() !== "uploading") {
         setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
         setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
      }
   };

   const handleUploadClick = () => {
      if (uploadStatus() !== "uploading") {
         fileInputRef.click();
      }
   };

   const handleConfirm = () => {
      const currentFiles = files();
      const currentPreviews = previews();
      const duration = uploadDuration();

      startBackgroundUpload(currentFiles, currentPreviews, duration);
      closeModal();
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
               <div class={styles.headerTabs}>
                  <button 
                     class={`${styles.tabButton} ${currentTab() === "upload" ? styles.activeTab : ""}`}
                     onClick={() => setCurrentTab("upload")}
                  >
                     📤 Upload
                  </button>
                  <button 
                     class={`${styles.tabButton} ${currentTab() === "history" ? styles.activeTab : ""}`}
                     onClick={() => setCurrentTab("history")}
                  >
                     📜 Historique
                  </button>
               </div>
            </div>
         </ModalHeader>
         <ModalBody>
            <Show when={currentTab() === "upload"}>
               <div
                  class={`${styles.uploadArea} ${isDragOver() ? styles.dragOver : ""} ${uploadStatus() === "uploading" ? styles.uploading : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleUploadClick}
               >
                  <Show when={uploadStatus() !== "uploading"} fallback={<p>Upload en cours... Veuillez patienter</p>}>
                     <p>🐱 Glissez-déposez des fichiers ici ou cliquez pour sélectionner</p>
                     <p class={styles.uploadInfo}>Taille maximale : 1GB par fichier</p>
                  </Show>
                  <input
                     type="file"
                     ref={fileInputRef}
                     onChange={handleFileChange}
                     multiple
                     hidden
                     disabled={uploadStatus() === "uploading"}
                  />
               </div>
               <Show when={uploadStatus() === "uploading"}>
                  <div class={styles.progressBar}>
                     <div class={styles.progressFill} style={{ width: `${uploadProgress()}%` }}></div>
                  </div>
               </Show>
               
               <div class={styles.durationSelector}>
                  <label>Expiration :</label>
                  <div class={styles.durationOptions}>
                     <button 
                        class={`${styles.durationOption} ${uploadDuration() === FileLifetime.OneHour ? styles.active : ""}`}
                        onClick={() => setUploadDuration(FileLifetime.OneHour)}
                        disabled={uploadStatus() === "uploading"}
                        title="1 Heure"
                     >
                        1h
                     </button>
                     <button 
                        class={`${styles.durationOption} ${uploadDuration() === FileLifetime.TwelveHours ? styles.active : ""}`}
                        onClick={() => setUploadDuration(FileLifetime.TwelveHours)}
                        disabled={uploadStatus() === "uploading"}
                        title="12 Heures"
                     >
                        12h
                     </button>
                     <button 
                        class={`${styles.durationOption} ${uploadDuration() === FileLifetime.OneDay ? styles.active : ""}`}
                        onClick={() => setUploadDuration(FileLifetime.OneDay)}
                        disabled={uploadStatus() === "uploading"}
                        title="24 Heures"
                     >
                        24h
                     </button>
                     <button 
                        class={`${styles.durationOption} ${uploadDuration() === FileLifetime.ThreeDays ? styles.active : ""}`}
                        onClick={() => setUploadDuration(FileLifetime.ThreeDays)}
                        disabled={uploadStatus() === "uploading"}
                        title="72 Heures (3 Jours)"
                     >
                        72h
                     </button>
                  </div>
               </div>

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
                              disabled={uploadStatus() === "uploading"}
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

            <Show when={currentTab() === "history"}>
               <div class={styles.historyContainer}>
                  <Show when={shelter.plugin.store.uploadHistory.length === 0}>
                     <div class={styles.emptyHistory}>
                        <p>📭 Aucun upload dans l'historique</p>
                        <p class={styles.uploadInfo}>Vos uploads apparaîtront ici</p>
                     </div>
                  </Show>
                  <div class={styles.historyList}>
                     <For each={shelter.plugin.store.uploadHistory}>
                        {(item, index) => {
                           const timeRemaining = getTimeRemaining(item.uploadDate, item.duration);
                           
                           return (
                              <div class={styles.historyItem}>
                                 <Show when={item.preview}>
                                    <img src={item.preview} class={styles.historyPreview} alt={item.filename} />
                                 </Show>
                                 <div class={styles.historyInfo}>
                                    <div class={styles.historyHeader}>
                                       <p class={styles.historyFilename}>{item.filename}</p>
                                       <span class={`${styles.badge} ${styles.badgeAnonymous}`}>
                                          🔒 Anonyme
                                       </span>
                                    </div>
                                    <p class={styles.historyMeta}>
                                       {formatFileSize(item.size)} • {formatUploadDate(item.uploadDate)}
                                    </p>
                                    <Show when={timeRemaining}>
                                       <p class={styles.historyExpiry}>
                                          ⏱️ {timeRemaining}
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
               <Show when={uploadStatus() === "uploading"}>
                  <Button
                     size={ButtonSizes.MEDIUM}
                     color={ButtonColors.RED}
                     onClick={() => {
                        cancelUpload();
                        closeModal();
                     }}
                  >
                     Cancel Upload
                  </Button>
               </Show>
               <Show when={uploadStatus() !== "uploading"}>
                  <Button
                     size={ButtonSizes.MEDIUM}
                     color={ButtonColors.SECONDARY}
                     onClick={() => closeModal()}
                  >
                     Cancel
                  </Button>
               </Show>
               <Button
                  disabled={uploadStatus() === "uploading" || files().length === 0}
                  size={ButtonSizes.MEDIUM}
                  color={ButtonColors.BRAND}
                  onClick={handleConfirm}
               >
                  {uploadStatus() === "uploading" ? "Uploading..." : "Upload"}
               </Button>
            </div>
         </ModalFooter>
      </ModalRoot>
   );
}
