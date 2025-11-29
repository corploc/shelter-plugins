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

let USERHASH = "";

export function updateUserHash(userhash) {
   USERHASH = userhash || "";
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

export async function uploadFiles(files, _previews, onProgress) {
   const totalSize = files.reduce((acc, file) => acc + file.size, 0);
   let uploadedSize = 0;
   const previews = {};
   const results = [];

   // Upload files sequentially to track progress properly
   for (let index = 0; index < files.length; index++) {
      const file = files[index];
      
      try {
         // Upload using browser-compatible implementation with 72h duration (maximum for Litterbox)
         const url = await uploadFileToLitterbox(file, FileLifetime.ThreeDays);

         previews[url] = _previews[index];
         results.push({ status: "fulfilled", value: url });
         
      } catch (error) {
         results.push({ status: "rejected", reason: error.message });
      }
      
      uploadedSize += file.size;
      onProgress(uploadedSize / totalSize);
   }

   return { uploadedFiles: Promise.resolve(results), previewsToSave: previews };
}
