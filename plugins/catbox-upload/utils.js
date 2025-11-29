// Browser-compatible implementation inspired by node-catbox
// node-catbox requires Node.js modules (fs, path) which aren't available in browser

const previewSize = 256;
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB in bytes

// File lifetime constants (compatible with Litterbox API)
export const FileLifetime = {
   OneHour: '1h',
   TwelveHours: '12h',
   OneDay: '24h',
   ThreeDays: '72h', // Maximum for Litterbox
};

const LITTERBOX_API_ENDPOINT = 'https://litterbox.catbox.moe/resources/internals/api.php';
const CATBOX_API_ENDPOINT = 'https://catbox.moe/user/api.php';

let USERHASH = "";

export function updateUserHash(userhash) {
   USERHASH = userhash || "";
}

export function hasUserHash() {
   return USERHASH && USERHASH.length > 0;
}

/**
 * Delete a file from Catbox (requires user hash)
 */
export async function deleteFileFromCatbox(filename) {
   if (!USERHASH) {
      throw new Error('User hash required to delete files');
   }

   const formData = new FormData();
   formData.append('reqtype', 'deletefiles');
   formData.append('userhash', USERHASH);
   formData.append('files', filename);

   const response = await fetch(CATBOX_API_ENDPOINT, {
      method: 'POST',
      body: formData,
   });

   if (!response.ok) {
      throw new Error(`Delete failed with status ${response.status}`);
   }

   const result = await response.text();
   
   if (!result.includes('successfully')) {
      throw new Error(result || 'Failed to delete file');
   }

   return true;
}

export async function getFilePreview(file, isImage, isVideo) {
   const url = file.url ? file.url : URL.createObjectURL(file);

   if (isImage || file?.type?.startsWith("image/")) {
      return new Promise((resolve) => {
         const img = document.createElement("img");
         img.crossOrigin = "anonymous";
         img.src = url;

         img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let scale = Math.min(previewSize / img.width, previewSize / img.height, 1);
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            if (!file.url) URL.revokeObjectURL(img.src);
            resolve(canvas.toDataURL("image/webp"));
         };

         img.onerror = () => resolve(null);
      });
   }

   if (isVideo || file?.type?.startsWith("video/")) {
      return new Promise((resolve) => {
         const video = document.createElement("video");
         video.crossOrigin = "anonymous";
         video.preload = "metadata";
         video.src = url;

         video.onloadedmetadata = () => {
            video.currentTime = 1;
         };

         video.onseeked = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            let scale = Math.min(previewSize / video.videoWidth, previewSize / video.videoHeight, 1);
            canvas.width = video.videoWidth * scale;
            canvas.height = video.videoHeight * scale;

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            if (!file.url) URL.revokeObjectURL(video.src);
            resolve(canvas.toDataURL("image/webp"));
         };

         video.onerror = () => resolve(null);
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

export function getTimeRemaining(uploadDate) {
   const SEVENTY_TWO_HOURS = 72 * 60 * 60 * 1000;
   const expirationDate = new Date(uploadDate).getTime() + SEVENTY_TWO_HOURS;
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

/**
 * Upload a file to Litterbox (browser-compatible implementation)
 * Inspired by node-catbox architecture but adapted for browser environment
 */
async function uploadFileToLitterbox(file, duration = FileLifetime.ThreeDays) {
   const formData = new FormData();
   formData.append('reqtype', 'fileupload');
   formData.append('fileToUpload', file);
   formData.append('time', duration);

   const response = await fetch(LITTERBOX_API_ENDPOINT, {
      method: 'POST',
      body: formData,
   });

   if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
   }

   const url = await response.text();
   const trimmedUrl = url.trim();
   
   if (!trimmedUrl || !trimmedUrl.startsWith('https://')) {
      throw new Error('Invalid response from Litterbox');
   }

   return trimmedUrl;
}

/**
 * Upload a file to Catbox with user hash (permanent storage)
 */
async function uploadFileToCatbox(file) {
   if (!USERHASH) {
      throw new Error('User hash required for Catbox upload');
   }

   const formData = new FormData();
   formData.append('reqtype', 'fileupload');
   formData.append('fileToUpload', file);
   formData.append('userhash', USERHASH);

   const response = await fetch(CATBOX_API_ENDPOINT, {
      method: 'POST',
      body: formData,
   });

   if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
   }

   const url = await response.text();
   const trimmedUrl = url.trim();
   
   if (!trimmedUrl || !trimmedUrl.startsWith('https://')) {
      throw new Error('Invalid response from Catbox');
   }

   return trimmedUrl;
}

export async function uploadFiles(files, _previews, onProgress, useAnonymous = false) {
   const totalSize = files.reduce((acc, file) => acc + file.size, 0);
   let uploadedSize = 0;
   const previews = {};
   const results = [];
   const uploadHistory = [];

   // Determine if we should use Catbox or Litterbox
   const shouldUseCatbox = !useAnonymous && USERHASH && USERHASH.length > 0;

   // Upload files sequentially to track progress properly
   for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const uploadDate = new Date().toISOString();
      
      try {
         let url;
         if (shouldUseCatbox) {
            // Upload to Catbox with user hash (permanent)
            url = await uploadFileToCatbox(file);
         } else {
            // Upload to Litterbox anonymously (72h)
            url = await uploadFileToLitterbox(file, FileLifetime.ThreeDays);
         }

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
            anonymous: !shouldUseCatbox,
            deletable: shouldUseCatbox
         });
         
      } catch (error) {
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
