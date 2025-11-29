const { createSignal } = shelter.solid;
import { uploadFiles } from "./utils";
import { injectLinks } from "./inject";

const {
    ui: { showToast },
    util: { log },
} = shelter;

export const [uploadStatus, setUploadStatus] = createSignal("idle"); // idle, uploading, success, error
export const [uploadProgress, setUploadProgress] = createSignal(0);
export const [uploadedUrls, setUploadedUrls] = createSignal([]);
export const [uploadError, setUploadError] = createSignal(null);
export const [currentUploadFiles, setCurrentUploadFiles] = createSignal([]);
export const [currentUploadPreviews, setCurrentUploadPreviews] = createSignal([]);

let abortController = null;

export function resetUploadState() {
    setUploadStatus("idle");
    setUploadProgress(0);
    setUploadedUrls([]);
    setUploadError(null);
    setCurrentUploadFiles([]);
    setCurrentUploadPreviews([]);
    abortController = null;
}

export function cancelUpload() {
    if (abortController) {
        abortController.abort();
        resetUploadState();
        showToast({
            title: "Upload annulé",
            content: "L'envoi des fichiers a été stoppé",
        });
    }
}

export async function startBackgroundUpload(files, previews, duration) {
    setUploadStatus("uploading");
    setUploadProgress(0);
    setUploadedUrls([]);
    setUploadError(null);
    setCurrentUploadFiles(files);
    setCurrentUploadPreviews(previews);

    abortController = new AbortController();

    try {
        const { uploadedFiles, previewsToSave, uploadHistory } = await uploadFiles(files, previews, (progress) => {
            setUploadProgress(progress * 100);
        }, duration, abortController.signal);

        const urls = (await uploadedFiles)
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);

        const failedUploads = (await uploadedFiles)
            .filter((result) => result.status === "rejected")
            .map((result) => result.reason);

        if (failedUploads.length == files.length) {
            // Use the error message from the first failure if available
            const errorMessage = failedUploads[0] || "Tous les fichiers n'ont pas pu être uploadés";
            showToast({
                title: "Upload échoué!",
                content: errorMessage,
                duration: 5000 // Show longer for errors
            });
            setUploadStatus("error");
            setUploadError(errorMessage);
        } else {
            if (failedUploads.length > 0) {
                showToast({
                    title: "Upload partiel!",
                    content: "Certains fichiers n'ont pas pu être uploadés",
                });
            } else {
                showToast({
                    title: "Upload réussi! 🎉",
                    content: "Liens prêts",
                });
            }

            shelter.plugin.store.previews = { ...shelter.plugin.store.previews, ...previewsToSave };

            // Save to history
            shelter.plugin.store.uploadHistory = [...uploadHistory, ...shelter.plugin.store.uploadHistory].slice(0, 50);

            setUploadedUrls(urls);
            setUploadStatus("success");

            // Inject links
            const success = await injectLinks(urls);
            if (success) {
                showToast({
                    title: "Copié!",
                    content: "Liens insérés et copiés",
                });
                // Copy to clipboard as well
                const allUrls = urls.join(" ");
                try {
                    await navigator.clipboard.writeText(allUrls);
                } catch (e) { }
            }
            
            // Reset state after a short delay so the user sees the success state if modal is open
            setTimeout(() => {
                resetUploadState();
            }, 2000);
        }
    } catch (err) {
        log("Catbox Upload Error: " + err.message, "error");
        setUploadStatus("error");
        setUploadError(err.message);
    }
}
