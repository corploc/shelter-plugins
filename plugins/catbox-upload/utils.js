// Browser-compatible implementation inspired by node-catbox
// node-catbox requires Node.js modules (fs, path) which aren't available in browser

const previewSize = 256;
const MAX_FILE_SIZE = 1024 * 1024 * 1024; // 1GB in bytes

// File lifetime constants (compatible with Litterbox API)
export const FileLifetime = {
   OneHour: '1h',
   TwelveHours: '12h',
   OneDay: '24h',
   ThreeDays: '72h', // Maximum for Litterbox
};

export function isFileTypeAllowed(file) {
   const filename = file.name.toLowerCase();
   // Forbidden: .exe, .scr, .cpl, .doc*, .jar
   if (filename.endsWith('.exe') || 
       filename.endsWith('.scr') || 
       filename.endsWith('.cpl') || 
       filename.endsWith('.jar') ||
       /\.doc[a-z0-9]*$/.test(filename)) {
      return false;
   }
   return true;
}

const LITTERBOX_API_ENDPOINT = 'https://litterbox.catbox.moe/resources/internals/api.php';

export async function getFilePreview(file, isImage, isVideo) {
   const url = file.url ? file.url : URL.createObjectURL(file);
   const isBlob = !file.url;

   if (isImage || file?.type?.startsWith("image/")) {
      return new Promise((resolve) => {
         const img = document.createElement("img");
         if (!isBlob) img.crossOrigin = "anonymous";
         img.src = url;

         const cleanup = () => {
            if (isBlob) URL.revokeObjectURL(url);
         };

         const timeoutId = setTimeout(() => {
            cleanup();
            resolve(null);
         }, 2000);

         img.onload = () => {
            clearTimeout(timeoutId);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let scale = Math.min(previewSize / img.width, previewSize / img.height, 1);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            cleanup();
            resolve(canvas.toDataURL("image/webp"));
         };

         img.onerror = () => {
            clearTimeout(timeoutId);
            cleanup();
            resolve(null);
         };
      });
   }

   if (isVideo || file?.type?.startsWith("video/")) {
      return new Promise((resolve) => {
         const video = document.createElement("video");
         if (!isBlob) video.crossOrigin = "anonymous";
         video.preload = "metadata";
         video.src = url;
         video.muted = true;
         video.playsInline = true;

         const cleanup = () => {
            if (isBlob) URL.revokeObjectURL(url);
            video.removeAttribute('src');
            video.load();
         };

         // Timeout to prevent hanging
         const timeoutId = setTimeout(() => {
            cleanup();
            resolve(null);
         }, 2000);

         video.onloadedmetadata = () => {
            video.currentTime = 0.1; // Seek to beginning
         };

         video.onseeked = () => {
            clearTimeout(timeoutId);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let scale = Math.min(previewSize / video.videoWidth, previewSize / video.videoHeight, 1);
            canvas.width = video.videoWidth * scale;
            canvas.height = video.videoHeight * scale;

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            cleanup();
            resolve(canvas.toDataURL("image/webp"));
         };

         video.onerror = () => {
            clearTimeout(timeoutId);
            cleanup();
            resolve(null);
         };
      });
   }

   return null;
}

export function formatFileSize(bytes) {
   if (bytes < 1024) return bytes + " bytes";
   else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
   else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
   else return (bytes / 1073741824).toFixed(1) + " GB";
}

export function getTimeRemaining(uploadDate, duration = FileLifetime.ThreeDays) {
   let durationMs = 72 * 60 * 60 * 1000;
   if (duration === FileLifetime.OneHour) durationMs = 1 * 60 * 60 * 1000;
   else if (duration === FileLifetime.TwelveHours) durationMs = 12 * 60 * 60 * 1000;
   else if (duration === FileLifetime.OneDay) durationMs = 24 * 60 * 60 * 1000;

   const expirationDate = new Date(uploadDate).getTime() + durationMs;
   const now = Date.now();
   const remaining = expirationDate - now;

   if (remaining <= 0) return "Expiré";

   const hours = Math.floor(remaining / (60 * 60 * 1000));
   const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

   if (hours >= 48) {
      const days = Math.floor(hours / 24);
      return `${days}j ${hours % 24}h restant${days > 1 ? 's' : ''}`;
   } else if (hours > 0) {
      return `${hours}h ${minutes}m restant${hours > 1 ? 's' : ''}`;
   } else {
      return `${minutes}m restant${minutes > 1 ? 's' : ''}`;
   }
}

export function formatUploadDate(dateString) {
   const date = new Date(dateString);
   const now = new Date();
   const diff = now - date;
   const seconds = Math.floor(diff / 1000);
   const minutes = Math.floor(seconds / 60);
   const hours = Math.floor(minutes / 60);
   const days = Math.floor(hours / 24);

   if (days > 0) return `Il y a ${days}j`;
   if (hours > 0) return `Il y a ${hours}h`;
   if (minutes > 0) return `Il y a ${minutes}min`;
   return "À l'instant";
}

function getTotalUploadedSize(uploadedSizes) {
   return Object.values(uploadedSizes).reduce((acc, size) => acc + size, 0);
}

const CORS_PROXY = 'https://corsproxy.io/?';

/**
 * Upload a file to Litterbox (browser-compatible implementation)
 * Uses XMLHttpRequest to support upload progress tracking
 */
function uploadFileToLitterbox(file, duration = FileLifetime.ThreeDays, signal, onProgress) {
   return new Promise((resolve, reject) => {
      const tryUpload = (useProxy) => {
         const xhr = new XMLHttpRequest();
         const formData = new FormData();
         
         formData.append('reqtype', 'fileupload');
         formData.append('fileToUpload', file);
         formData.append('time', duration);

         let url = LITTERBOX_API_ENDPOINT;
         if (useProxy) {
            url = CORS_PROXY + LITTERBOX_API_ENDPOINT;
         }

         xhr.open('POST', url);

         if (signal) {
            signal.addEventListener('abort', () => {
               xhr.abort();
               reject(new Error("Upload cancelled"));
            });
         }

         xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
               onProgress(event.loaded / event.total);
            }
         };

         xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
               const responseText = xhr.responseText.trim();
               if (responseText && responseText.startsWith('https://')) {
                  resolve(responseText);
               } else {
                  reject(new Error('Invalid response from Litterbox'));
               }
            } else {
               reject(new Error(`Upload failed with status ${xhr.status}`));
            }
         };

         xhr.onerror = () => {
            // If direct upload fails (likely CORS), try proxy regardless of size
            // Note: Proxy might fail for very large files, but it's the only option without flags
            if (!useProxy) {
               tryUpload(true);
            } else {
               let msg = 'Network error (CORS).';
               if (file.size >= 10 * 1024 * 1024) {
                  msg += ' Large file upload via proxy failed. Try launching Discord with --disable-web-security for direct upload.';
               }
               reject(new Error(msg));
            }
         };

         xhr.send(formData);
      };

      tryUpload(false);
   });
}

export async function uploadFiles(files, _previews, onProgress, duration = FileLifetime.ThreeDays, signal) {
   const totalSize = files.reduce((acc, file) => acc + file.size, 0);
   let uploadedSize = 0;
   const previews = {};
   const results = [];
   const uploadHistory = [];

   // Upload files sequentially to track progress properly
   for (let index = 0; index < files.length; index++) {
      if (signal?.aborted) {
         throw new Error("Upload cancelled");
      }

      const file = files[index];
      const uploadDate = new Date().toISOString();
      
      try {
         // Upload to Litterbox anonymously
         const url = await uploadFileToLitterbox(file, duration, signal, (fileProgress) => {
            // Calculate total progress: (already uploaded bytes + current file bytes * current file progress) / total bytes
            const currentUploadedSize = uploadedSize + (file.size * fileProgress);
            onProgress(currentUploadedSize / totalSize);
         });

         previews[url] = _previews[index];
         results.push({ status: "fulfilled", value: url });
         
         // Extract filename from URL for deletion later
         const urlParts = url.split('/');
         const filenameFromUrl = urlParts[urlParts.length - 1];
         
         // Save upload history
         uploadHistory.push({
            url,
            filename: file.name,
            filenameOnServer: filenameFromUrl,
            size: file.size,
            uploadDate,
            preview: _previews[index],
            anonymous: true,
            deletable: false,
            duration: duration
         });
         
      } catch (error) {
         if (error.name === 'AbortError' || signal?.aborted || error.message === "Upload cancelled") {
             throw new Error("Upload cancelled");
         }
         results.push({ status: "rejected", reason: error.message });
      }
      
      uploadedSize += file.size;
      onProgress(uploadedSize / totalSize);
   }

   return { 
      uploadedFiles: Promise.resolve(results), 
      previewsToSave: previews,
      uploadHistory 
   };
}
