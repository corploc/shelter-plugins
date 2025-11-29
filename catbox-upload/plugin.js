(function(exports) {

//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function() {
	return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion

//#region solid-js/web
var require_web = __commonJS({ "solid-js/web"(exports, module) {
	module.exports = shelter.solidWeb;
} });

//#endregion
//#region plugins/catbox-upload/modal.jsx.scss
shelter.plugin.scoped.ui.injectCss(`.AGuvFG_uploadArea {
  border: 2px dashed var(--interactive-normal);
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 20px;
  transition: all .3s;
}

.AGuvFG_uploadArea:hover, .AGuvFG_uploadArea.AGuvFG_dragOver {
  background-color: var(--brand-15a);
  border-color: #fff;
}

.AGuvFG_previewItem:hover {
  border-color: var(--background-secondary);
  background-color: var(--brand-15a);
}

.AGuvFG_uploadArea.AGuvFG_uploading {
  pointer-events: none;
  opacity: .7;
}

.AGuvFG_progressBar {
  background-color: var(--status-offline);
  border-radius: 10px;
  width: 100%;
  height: 20px;
  margin-top: 10px;
  overflow: hidden;
}

.AGuvFG_progressFill {
  background-color: var(--status-positive);
  height: 100%;
  transition: width .3s ease-in-out;
}

.AGuvFG_previewArea {
  flex-wrap: wrap;
  gap: 10px;
  width: 110%;
  margin-top: 20px;
  display: flex;
}

.AGuvFG_previewItem {
  border: 1px solid var(--border-subtle);
  background-color: var(--background-surface-highest);
  border-radius: 8px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  height: 180px;
  margin-left: -3px;
  padding: 8px;
  transition: all .3s;
  display: flex;
  position: relative;
  overflow: hidden;
}

.AGuvFG_previewImage, .AGuvFG_previewVideo {
  object-fit: contain;
  border-radius: 8px;
  max-width: 100%;
  max-height: 100px;
}

.AGuvFG_previewIcon {
  justify-content: center;
  align-items: center;
  height: 120px;
  font-size: 48px;
  display: flex;
}

.AGuvFG_previewItemInfo {
  text-align: center;
  width: 100%;
}

.AGuvFG_previewItemInfo p {
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 2px 0;
  font-size: 12px;
  overflow: hidden;
}

.AGuvFG_removeButton {
  color: var(--status-danger);
  border: 1px solid color-mix(in srgb, var(--border-subtle) 30%, transparent);
  background-color: color-mix(in srgb, color-mix(in srgb, var(--status-danger) 40%, var(--background-surface-high)) 40%, transparent);
  backdrop-filter: blur(4px);
  cursor: pointer;
  border-radius: 8px;
  padding: 4px 5px 1px;
  font-size: 12px;
  transition: all .3s;
  position: absolute;
  top: 4px;
  right: 4px;
}

.AGuvFG_removeButton:hover {
  animation: .3s AGuvFG_shake;
  transform: scale(1.1);
}

@keyframes AGuvFG_shake {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(5deg);
  }

  50% {
    transform: rotate(-5deg)scale(1.1);
  }

  75% {
    transform: rotate(5deg)scale(1.1);
  }

  100% {
    transform: rotate(0)scale(1.1);
  }
}

.AGuvFG_uploadModal {
  user-select: none;
  width: 645px;
}

.AGuvFG_footer {
  justify-content: flex-end;
  gap: .5rem;
  display: flex;
}

[class^="buttons"] > [aria-haspopup="dialog"] {
  display: none;
}

.AGuvFG_replacedButton {
  color: var(--interactive-normal);
  transform-origin: bottom;
  background: none;
  align-items: center;
  display: flex;
}

.AGuvFG_replacedButton:hover {
  color: var(--icon-primary);
  animation: 1.2s ease-in-out AGuvFG_sway;
}

@keyframes AGuvFG_sway {
  0% {
    transform: rotate(0);
  }

  4% {
    transform: rotate(0);
  }

  14% {
    transform: rotate(5deg);
  }

  39% {
    transform: rotate(-5deg);
  }

  41% {
    transform: rotate(0);
  }
}

.AGuvFG_errorMessage {
  color: var(--status-danger);
  margin-top: 10px;
  font-size: 14px;
}

.AGuvFG_uploadInfo {
  color: var(--text-muted);
  margin-top: 5px;
  font-size: 12px;
}

.AGuvFG_headerContent {
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-right: 10px;
  display: flex;
}

.AGuvFG_headerTabs {
  gap: 8px;
  display: flex;
}

.AGuvFG_tabButton {
  color: var(--text-muted);
  cursor: pointer;
  background: none;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  transition: all .2s;
}

.AGuvFG_tabButton:hover {
  background: var(--background-modifier-hover);
  color: var(--text-normal);
}

.AGuvFG_activeTab {
  background: var(--brand-experiment);
  color: #fff;
}

.AGuvFG_activeTab:hover {
  background: var(--brand-experiment-560);
  color: #fff;
}

.AGuvFG_historyContainer {
  max-height: 500px;
  overflow-y: auto;
}

.AGuvFG_emptyHistory {
  text-align: center;
  color: var(--text-muted);
  padding: 40px 20px;
}

.AGuvFG_emptyHistory p:first-child {
  margin-bottom: 10px;
  font-size: 24px;
}

.AGuvFG_historyList {
  flex-direction: column;
  gap: 10px;
  display: flex;
}

.AGuvFG_historyItem {
  background: var(--background-secondary);
  border: 1px solid var(--background-tertiary);
  border-radius: 8px;
  align-items: center;
  gap: 12px;
  padding: 12px;
  transition: all .2s;
  display: flex;
}

.AGuvFG_historyItem:hover {
  background: var(--background-secondary-alt);
  border-color: var(--brand-experiment);
  transform: translateX(2px);
}

.AGuvFG_historyPreview {
  object-fit: cover;
  border: 1px solid var(--background-tertiary);
  border-radius: 6px;
  width: 60px;
  height: 60px;
}

.AGuvFG_historyInfo {
  flex: 1;
  min-width: 0;
}

.AGuvFG_historyFilename {
  color: var(--text-normal);
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
}

.AGuvFG_historyMeta {
  color: var(--text-muted);
  margin: 0 0 4px;
  font-size: 12px;
}

.AGuvFG_historyExpiry {
  color: var(--status-warning);
  margin: 0;
  font-size: 12px;
  font-weight: 500;
}

.AGuvFG_historyPermanent {
  color: var(--status-positive);
  margin: 0;
  font-size: 12px;
  font-weight: 500;
}

.AGuvFG_historyHeader {
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  display: flex;
}

.AGuvFG_badge {
  text-transform: uppercase;
  letter-spacing: .5px;
  white-space: nowrap;
  border-radius: 10px;
  flex-shrink: 0;
  align-items: center;
  gap: 3px;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  display: inline-flex;
}

.AGuvFG_badgeAnonymous {
  color: #faa61a;
  background: #faa61a26;
  border: 1px solid #faa61a;
  font-weight: 700;
}

.AGuvFG_badgeAuth {
  background: var(--status-positive-background);
  color: var(--status-positive);
  border: 1px solid var(--status-positive);
}

.AGuvFG_durationSelector {
  background: var(--background-tertiary);
  border: 1px solid var(--background-modifier-accent);
  border-radius: 8px;
  flex-direction: column;
  gap: 8px;
  margin: 15px 0;
  padding: 12px;
  display: flex;
}

.AGuvFG_durationSelector label {
  color: var(--text-normal);
  text-transform: uppercase;
  letter-spacing: .5px;
  margin-bottom: 4px;
  font-size: 12px;
  font-weight: 600;
}

.AGuvFG_durationOptions {
  gap: 8px;
  width: 100%;
  display: flex;
}

.AGuvFG_durationOption {
  background: var(--background-secondary);
  color: var(--text-muted);
  border: 1px solid var(--background-modifier-accent);
  cursor: pointer;
  text-align: center;
  border-radius: 4px;
  flex: 1;
  padding: 8px;
  font-size: 13px;
  font-weight: 500;
  transition: all .2s;
}

.AGuvFG_durationOption:hover:not(:disabled) {
  background: var(--background-modifier-hover);
  color: var(--text-normal);
  border-color: var(--text-muted);
}

.AGuvFG_durationOption.AGuvFG_active {
  background: var(--brand-experiment);
  color: #fff;
  border-color: var(--brand-experiment);
}

.AGuvFG_durationOption:disabled, .AGuvFG_buttonDisabled {
  opacity: .5;
  cursor: not-allowed;
}

.AGuvFG_historyActions {
  gap: 8px;
  display: flex;
}

.AGuvFG_copyButton, .AGuvFG_deleteButton {
  border: 1px solid var(--background-modifier-accent);
  cursor: pointer;
  background: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 16px;
  transition: all .2s;
}

.AGuvFG_copyButton:hover {
  background: var(--brand-experiment-15a);
  border-color: var(--brand-experiment);
  transform: scale(1.1);
}

.AGuvFG_deleteButton:hover {
  background: var(--status-danger-background);
  border-color: var(--status-danger);
  transform: scale(1.1);
}

.AGuvFG_choiceModal {
  user-select: none;
}

.AGuvFG_choiceContent {
  padding: 10px 0;
}

.AGuvFG_choiceTitle {
  color: var(--text-normal);
  text-align: center;
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}

.AGuvFG_choiceSubtitle {
  color: var(--text-muted);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0 20px;
  font-size: 13px;
  overflow: hidden;
}

.AGuvFG_choiceOptions {
  flex-direction: column;
  gap: 15px;
  display: flex;
}

.AGuvFG_choiceOption {
  background: var(--background-secondary);
  border: 3px solid var(--background-tertiary);
  cursor: pointer;
  text-align: left;
  border-radius: 12px;
  align-items: flex-start;
  gap: 15px;
  width: 100%;
  padding: 20px;
  transition: all .25s;
  display: flex;
  position: relative;
}

.AGuvFG_choiceOption:hover {
  border-color: var(--brand-experiment);
  background: var(--background-secondary-alt);
  transform: scale(1.03);
  box-shadow: 0 8px 24px #0000004d;
}

.AGuvFG_choiceOption:first-child:hover {
  border-color: var(--status-positive);
}

.AGuvFG_optionBadge {
  background: var(--status-positive);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: .5px;
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  position: absolute;
  top: 10px;
  right: 10px;
}

.AGuvFG_optionIcon {
  flex-shrink: 0;
  font-size: 32px;
  line-height: 1;
}

.AGuvFG_optionInfo {
  color: #fff;
  flex: 1;
}

.AGuvFG_optionInfo h3 {
  color: var(--text-normal);
  margin: 0 0 10px;
  font-size: 15px;
  font-weight: 600;
}

.AGuvFG_optionInfo ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.AGuvFG_optionInfo ul li {
  color: var(--text-muted);
  margin: 4px 0;
  padding-left: 0;
  font-size: 13px;
}

.AGuvFG_choiceFooter {
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  display: flex;
}

.AGuvFG_choiceHint {
  text-align: center;
  color: var(--text-muted);
  margin: 0;
  font-size: 13px;
  font-style: italic;
}
`);
var modal_jsx_default = {
	"activeTab": "AGuvFG_activeTab",
	"historyContainer": "AGuvFG_historyContainer",
	"badge": "AGuvFG_badge",
	"tabButton": "AGuvFG_tabButton",
	"active": "AGuvFG_active",
	"buttonDisabled": "AGuvFG_buttonDisabled",
	"dragOver": "AGuvFG_dragOver",
	"sway": "AGuvFG_sway",
	"historyInfo": "AGuvFG_historyInfo",
	"historyHeader": "AGuvFG_historyHeader",
	"emptyHistory": "AGuvFG_emptyHistory",
	"historyList": "AGuvFG_historyList",
	"historyItem": "AGuvFG_historyItem",
	"copyButton": "AGuvFG_copyButton",
	"choiceModal": "AGuvFG_choiceModal",
	"uploadInfo": "AGuvFG_uploadInfo",
	"headerContent": "AGuvFG_headerContent",
	"historyPreview": "AGuvFG_historyPreview",
	"uploadModal": "AGuvFG_uploadModal",
	"historyActions": "AGuvFG_historyActions",
	"choiceOptions": "AGuvFG_choiceOptions",
	"previewVideo": "AGuvFG_previewVideo",
	"choiceOption": "AGuvFG_choiceOption",
	"optionBadge": "AGuvFG_optionBadge",
	"durationOption": "AGuvFG_durationOption",
	"optionIcon": "AGuvFG_optionIcon",
	"choiceContent": "AGuvFG_choiceContent",
	"previewItem": "AGuvFG_previewItem",
	"historyPermanent": "AGuvFG_historyPermanent",
	"previewArea": "AGuvFG_previewArea",
	"footer": "AGuvFG_footer",
	"previewItemInfo": "AGuvFG_previewItemInfo",
	"removeButton": "AGuvFG_removeButton",
	"badgeAuth": "AGuvFG_badgeAuth",
	"choiceFooter": "AGuvFG_choiceFooter",
	"previewImage": "AGuvFG_previewImage",
	"replacedButton": "AGuvFG_replacedButton",
	"historyFilename": "AGuvFG_historyFilename",
	"choiceSubtitle": "AGuvFG_choiceSubtitle",
	"optionInfo": "AGuvFG_optionInfo",
	"choiceHint": "AGuvFG_choiceHint",
	"historyExpiry": "AGuvFG_historyExpiry",
	"progressFill": "AGuvFG_progressFill",
	"durationOptions": "AGuvFG_durationOptions",
	"deleteButton": "AGuvFG_deleteButton",
	"shake": "AGuvFG_shake",
	"durationSelector": "AGuvFG_durationSelector",
	"choiceTitle": "AGuvFG_choiceTitle",
	"previewIcon": "AGuvFG_previewIcon",
	"historyMeta": "AGuvFG_historyMeta",
	"badgeAnonymous": "AGuvFG_badgeAnonymous",
	"errorMessage": "AGuvFG_errorMessage",
	"headerTabs": "AGuvFG_headerTabs",
	"uploadArea": "AGuvFG_uploadArea",
	"uploading": "AGuvFG_uploading",
	"progressBar": "AGuvFG_progressBar"
};

//#endregion
//#region plugins/catbox-upload/utils.js
const previewSize = 256;
const FileLifetime = {
	OneHour: "1h",
	TwelveHours: "12h",
	OneDay: "24h",
	ThreeDays: "72h"
};
function isFileTypeAllowed(file) {
	const filename = file.name.toLowerCase();
	if (filename.endsWith(".exe") || filename.endsWith(".scr") || filename.endsWith(".cpl") || filename.endsWith(".jar") || /\.doc[a-z0-9]*$/.test(filename)) return false;
	return true;
}
const LITTERBOX_API_ENDPOINT = "https://litterbox.catbox.moe/resources/internals/api.php";
async function getFilePreview(file, isImage, isVideo) {
	const url = file.url ? file.url : URL.createObjectURL(file);
	const isBlob = !file.url;
	if (isImage || file?.type?.startsWith("image/")) return new Promise((resolve) => {
		const img = document.createElement("img");
		if (!isBlob) img.crossOrigin = "anonymous";
		img.src = url;
		const cleanup = () => {
			if (isBlob) URL.revokeObjectURL(url);
		};
		const timeoutId = setTimeout(() => {
			cleanup();
			resolve(null);
		}, 2e3);
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
	if (isVideo || file?.type?.startsWith("video/")) return new Promise((resolve) => {
		const video = document.createElement("video");
		if (!isBlob) video.crossOrigin = "anonymous";
		video.preload = "metadata";
		video.src = url;
		video.muted = true;
		video.playsInline = true;
		const cleanup = () => {
			if (isBlob) URL.revokeObjectURL(url);
			video.removeAttribute("src");
			video.load();
		};
		const timeoutId = setTimeout(() => {
			cleanup();
			resolve(null);
		}, 2e3);
		video.onloadedmetadata = () => {
			video.currentTime = .1;
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
	return null;
}
function formatFileSize(bytes) {
	if (bytes < 1024) return bytes + " bytes";
else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + " MB";
else return (bytes / 1073741824).toFixed(1) + " GB";
}
function getTimeRemaining(uploadDate, duration = FileLifetime.ThreeDays) {
	let durationMs = 2592e5;
	if (duration === FileLifetime.OneHour) durationMs = 36e5;
else if (duration === FileLifetime.TwelveHours) durationMs = 432e5;
else if (duration === FileLifetime.OneDay) durationMs = 864e5;
	const expirationDate = new Date(uploadDate).getTime() + durationMs;
	const now = Date.now();
	const remaining = expirationDate - now;
	if (remaining <= 0) return "Expiré";
	const hours = Math.floor(remaining / 36e5);
	const minutes = Math.floor(remaining % 36e5 / 6e4);
	if (hours >= 48) {
		const days = Math.floor(hours / 24);
		return `${days}j ${hours % 24}h restant${days > 1 ? "s" : ""}`;
	} else if (hours > 0) return `${hours}h ${minutes}m restant${hours > 1 ? "s" : ""}`;
else return `${minutes}m restant${minutes > 1 ? "s" : ""}`;
}
function formatUploadDate(dateString) {
	const date = new Date(dateString);
	const now = new Date();
	const diff = now - date;
	const seconds = Math.floor(diff / 1e3);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	if (days > 0) return `Il y a ${days}j`;
	if (hours > 0) return `Il y a ${hours}h`;
	if (minutes > 0) return `Il y a ${minutes}min`;
	return "À l'instant";
}
const CORS_PROXY = "https://corsproxy.io/?";
/**
* Upload a file to Litterbox (browser-compatible implementation)
* Uses XMLHttpRequest to support upload progress tracking
*/
function uploadFileToLitterbox(file, duration = FileLifetime.ThreeDays, signal, onProgress) {
	return new Promise((resolve, reject) => {
		const tryUpload = (useProxy) => {
			const xhr = new XMLHttpRequest();
			const formData = new FormData();
			formData.append("reqtype", "fileupload");
			formData.append("fileToUpload", file);
			formData.append("time", duration);
			let url = LITTERBOX_API_ENDPOINT;
			if (useProxy) url = CORS_PROXY + LITTERBOX_API_ENDPOINT;
			xhr.open("POST", url);
			if (signal) signal.addEventListener("abort", () => {
				xhr.abort();
				reject(new Error("Upload cancelled"));
			});
			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable && onProgress) onProgress(event.loaded / event.total);
			};
			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					const responseText = xhr.responseText.trim();
					if (responseText && responseText.startsWith("https://")) resolve(responseText);
else reject(new Error("Invalid response from Litterbox"));
				} else reject(new Error(`Upload failed with status ${xhr.status}`));
			};
			xhr.onerror = () => {
				if (!useProxy) tryUpload(true);
else {
					let msg = "Network error (CORS).";
					if (file.size >= 10485760) msg += " Large file upload via proxy failed. Try launching Discord with --disable-web-security for direct upload.";
					reject(new Error(msg));
				}
			};
			xhr.send(formData);
		};
		tryUpload(false);
	});
}
async function uploadFiles(files, _previews, onProgress, duration = FileLifetime.ThreeDays, signal) {
	const totalSize = files.reduce((acc, file) => acc + file.size, 0);
	let uploadedSize = 0;
	const previews = {};
	const results = [];
	const uploadHistory = [];
	for (let index = 0; index < files.length; index++) {
		if (signal?.aborted) throw new Error("Upload cancelled");
		const file = files[index];
		const uploadDate = new Date().toISOString();
		try {
			const url = await uploadFileToLitterbox(file, duration, signal, (fileProgress) => {
				const currentUploadedSize = uploadedSize + file.size * fileProgress;
				onProgress(currentUploadedSize / totalSize);
			});
			previews[url] = _previews[index];
			results.push({
				status: "fulfilled",
				value: url
			});
			const urlParts = url.split("/");
			const filenameFromUrl = urlParts[urlParts.length - 1];
			uploadHistory.push({
				url,
				filename: file.name,
				filenameOnServer: filenameFromUrl,
				size: file.size,
				uploadDate,
				preview: _previews[index],
				anonymous: true,
				deletable: false,
				duration
			});
		} catch (error) {
			if (error.name === "AbortError" || signal?.aborted || error.message === "Upload cancelled") throw new Error("Upload cancelled");
			results.push({
				status: "rejected",
				reason: error.message
			});
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

//#endregion
//#region plugins/catbox-upload/inject.js
const { util: { getFiber: getFiber$1 } } = shelter;
async function injectLinks(urls) {
	try {
		const fiber = getFiber$1(document.querySelector("[class*=\"slateContainer\"]"));
		if (!fiber) return false;
		const editor = fiber.child.pendingProps.editor;
		if (!editor) return false;
		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];
			editor.insertText(url);
			if (i < urls.length - 1) editor.insertText(" ");
		}
		return true;
	} catch (e) {
		console.error("Failed to inject links:", e);
		return false;
	}
}

//#endregion
//#region plugins/catbox-upload/state.js
const { createSignal: createSignal$2 } = shelter.solid;
const { ui: { showToast: showToast$2 }, util: { log: log$1 } } = shelter;
const [uploadStatus, setUploadStatus] = createSignal$2("idle");
const [uploadProgress, setUploadProgress] = createSignal$2(0);
const [uploadedUrls, setUploadedUrls] = createSignal$2([]);
const [uploadError, setUploadError] = createSignal$2(null);
const [currentUploadFiles, setCurrentUploadFiles] = createSignal$2([]);
const [currentUploadPreviews, setCurrentUploadPreviews] = createSignal$2([]);
let abortController = null;
function resetUploadState() {
	setUploadStatus("idle");
	setUploadProgress(0);
	setUploadedUrls([]);
	setUploadError(null);
	setCurrentUploadFiles([]);
	setCurrentUploadPreviews([]);
	abortController = null;
}
function cancelUpload() {
	if (abortController) {
		abortController.abort();
		resetUploadState();
		showToast$2({
			title: "Upload annulé",
			content: "L'envoi des fichiers a été stoppé"
		});
	}
}
async function startBackgroundUpload(files, previews, duration) {
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
		const urls = (await uploadedFiles).filter((result) => result.status === "fulfilled").map((result) => result.value);
		const failedUploads = (await uploadedFiles).filter((result) => result.status === "rejected").map((result) => result.reason);
		if (failedUploads.length == files.length) {
			const errorMessage = failedUploads[0] || "Tous les fichiers n'ont pas pu être uploadés";
			showToast$2({
				title: "Upload échoué!",
				content: errorMessage,
				duration: 5e3
			});
			setUploadStatus("error");
			setUploadError(errorMessage);
		} else {
			if (failedUploads.length > 0) showToast$2({
				title: "Upload partiel!",
				content: "Certains fichiers n'ont pas pu être uploadés"
			});
else showToast$2({
				title: "Upload réussi! 🎉",
				content: "Liens prêts"
			});
			shelter.plugin.store.previews = {
				...shelter.plugin.store.previews,
				...previewsToSave
			};
			shelter.plugin.store.uploadHistory = [...uploadHistory, ...shelter.plugin.store.uploadHistory].slice(0, 50);
			setUploadedUrls(urls);
			setUploadStatus("success");
			const success = await injectLinks(urls);
			if (success) {
				showToast$2({
					title: "Copié!",
					content: "Liens insérés et copiés"
				});
				const allUrls = urls.join(" ");
				try {
					await navigator.clipboard.writeText(allUrls);
				} catch (e) {}
			}
			setTimeout(() => {
				resetUploadState();
			}, 2e3);
		}
	} catch (err) {
		log$1("Catbox Upload Error: " + err.message, "error");
		setUploadStatus("error");
		setUploadError(err.message);
	}
}

//#endregion
//#region plugins/catbox-upload/modal.jsx
var import_web$24 = __toESM(require_web(), 1);
var import_web$25 = __toESM(require_web(), 1);
var import_web$26 = __toESM(require_web(), 1);
var import_web$27 = __toESM(require_web(), 1);
var import_web$28 = __toESM(require_web(), 1);
var import_web$29 = __toESM(require_web(), 1);
var import_web$30 = __toESM(require_web(), 1);
var import_web$31 = __toESM(require_web(), 1);
var import_web$32 = __toESM(require_web(), 1);
var import_web$33 = __toESM(require_web(), 1);
var import_web$34 = __toESM(require_web(), 1);
var import_web$35 = __toESM(require_web(), 1);
const _tmpl$$4 = /*#__PURE__*/ (0, import_web$24.template)(`<div><span>Upload to Litterbox</span><div><button>📤 Upload</button><button>📜 Historique</button></div></div>`, 10), _tmpl$2$2 = /*#__PURE__*/ (0, import_web$24.template)(`<p>🐱 Glissez-déposez des fichiers ici ou cliquez pour sélectionner</p>`, 2), _tmpl$3$1 = /*#__PURE__*/ (0, import_web$24.template)(`<p>Taille maximale : 1GB par fichier</p>`, 2), _tmpl$4$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div><!#><!/><input type="file" multiple hidden></div>`, 5), _tmpl$5$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div><div></div></div>`, 4), _tmpl$6$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div><label>Expiration :</label><div><button title="1 Heure">1h</button><button title="12 Heures">12h</button><button title="24 Heures">24h</button><button title="72 Heures (3 Jours)">72h</button></div></div>`, 14), _tmpl$7$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div></div>`, 2), _tmpl$8$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div><p>📭 Aucun upload dans l'historique</p><p>Vos uploads apparaîtront ici</p></div>`, 6), _tmpl$9$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div><!#><!/><div></div></div>`, 6), _tmpl$0$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div><!#><!/><!#><!/><!#><!/></div>`, 8), _tmpl$1$1 = /*#__PURE__*/ (0, import_web$24.template)(`<p>Upload en cours... Veuillez patienter</p>`, 2), _tmpl$10$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div><!#><!/><!#><!/><!#><!/><div><p></p><p></p></div><button><svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M14.25 1c.41 0 .75.34.75.75V3h5.25c.41 0 .75.34.75.75v.5c0 .41-.34.75-.75.75H3.75A.75.75 0 0 1 3 4.25v-.5c0-.41.34-.75.75-.75H9V1.75c0-.41.34-.75.75-.75h4.5Z" class=""></path><path fill="currentColor" fill-rule="evenodd" d="M5.06 7a1 1 0 0 0-1 1.06l.76 12.13a3 3 0 0 0 3 2.81h8.36a3 3 0 0 0 3-2.81l.75-12.13a1 1 0 0 0-1-1.06H5.07ZM11 12a1 1 0 1 0-2 0v6a1 1 0 1 0 2 0v-6Zm3-1a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1Z" clip-rule="evenodd" class=""></path></svg></button></div>`, 22), _tmpl$11$1 = /*#__PURE__*/ (0, import_web$24.template)(`<img>`, 1), _tmpl$12$1 = /*#__PURE__*/ (0, import_web$24.template)(`<div>📄</div>`, 2), _tmpl$13 = /*#__PURE__*/ (0, import_web$24.template)(`<p>⏱️ <!#><!/></p>`, 4), _tmpl$14 = /*#__PURE__*/ (0, import_web$24.template)(`<div><!#><!/><div><div><p></p><span>🔒 Anonyme</span></div><p><!#><!/> • <!#><!/></p><!#><!/></div><div><button title="Copier le lien">📋</button></div></div>`, 24);
const { ui: { ModalRoot: ModalRoot$1, ModalHeader: ModalHeader$1, ModalBody: ModalBody$1, ModalFooter: ModalFooter$1, ModalSizes: ModalSizes$1, showToast: showToast$1, Button: Button$2, ButtonColors: ButtonColors$2, ButtonSizes: ButtonSizes$2 }, solid: { createSignal: createSignal$1, createEffect: createEffect$1, Show: Show$2, For, onCleanup }, util: { log, getFiber } } = shelter;
function UploadModal(closeModal, initialFiles = []) {
	const isRestoring = uploadStatus() === "uploading";
	const [files, setFiles] = createSignal$1(isRestoring ? currentUploadFiles() : initialFiles);
	const [isDragOver, setIsDragOver] = createSignal$1(false);
	const [previews, setPreviews] = createSignal$1(isRestoring ? currentUploadPreviews() : []);
	const [currentTab, setCurrentTab] = createSignal$1("upload");
	const [uploadDuration, setUploadDuration] = createSignal$1(FileLifetime.ThreeDays);
	let isMounted = true;
	onCleanup(() => {
		isMounted = false;
	});
	shelter.plugin.store.uploadHistory ??= [];
	let fileInputRef;
	const copyToClipboard = async (text) => {
		try {
			await navigator.clipboard.writeText(text);
			showToast$1({
				title: "Copié!",
				content: "Le lien a été copié dans le presse-papier"
			});
		} catch (err) {
			log("Failed to copy to clipboard", "error");
		}
	};
	const deleteFromHistory = async (index) => {
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
			if (allowedFiles.length < droppedFiles.length) showToast$1({
				title: "Fichiers ignorés",
				content: "Certains types de fichiers ne sont pas autorisés (.exe, .scr, .cpl, .doc*, .jar)"
			});
			const oversizedFiles = allowedFiles.filter((f) => f.size > 1073741824);
			if (oversizedFiles.length > 0) showToast$1({
				title: "Fichiers trop volumineux",
				content: `Certains fichiers dépassent la limite de 1GB et ont été ignorés.`
			});
			const validFiles = allowedFiles.filter((f) => f.size <= 1073741824);
			if (validFiles.length > 0) setFiles((prevFiles) => [...prevFiles, ...validFiles]);
		}
	};
	const handleFileChange = (e) => {
		if (e.target.files && uploadStatus() !== "uploading") {
			const selectedFiles = Array.from(e.target.files);
			const allowedFiles = selectedFiles.filter(isFileTypeAllowed);
			if (allowedFiles.length < selectedFiles.length) showToast$1({
				title: "Fichiers ignorés",
				content: "Certains types de fichiers ne sont pas autorisés (.exe, .scr, .cpl, .doc*, .jar)"
			});
			const oversizedFiles = allowedFiles.filter((f) => f.size > 1073741824);
			if (oversizedFiles.length > 0) showToast$1({
				title: "Fichiers trop volumineux",
				content: `Certains fichiers dépassent la limite de 1GB et ont été ignorés.`
			});
			const validFiles = allowedFiles.filter((f) => f.size <= 1073741824);
			if (validFiles.length > 0) setFiles((prevFiles) => [...prevFiles, ...validFiles]);
		}
	};
	const handleRemoveFile = (index) => {
		if (uploadStatus() !== "uploading") {
			setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
			setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
		}
	};
	const handleUploadClick = () => {
		if (uploadStatus() !== "uploading") fileInputRef.click();
	};
	const handleConfirm = () => {
		const currentFiles = files();
		const currentPreviews = previews();
		const duration = uploadDuration();
		startBackgroundUpload(currentFiles, currentPreviews, duration);
		closeModal();
	};
	createEffect$1(() => {
		const newFiles = files();
		Promise.all(newFiles.map((file) => getFilePreview(file))).then((newPreviews) => {
			setPreviews(newPreviews);
		});
	});
	return (0, import_web$31.createComponent)(ModalRoot$1, {
		get size() {
			return ModalSizes$1.MEDIUM;
		},
		get ["class"]() {
			return modal_jsx_default.uploadModal;
		},
		get children() {
			return [
				(0, import_web$31.createComponent)(ModalHeader$1, {
					close: closeModal,
					get children() {
						const _el$ = (0, import_web$34.getNextElement)(_tmpl$$4), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling;
						_el$4.$$click = () => setCurrentTab("upload");
						_el$5.$$click = () => setCurrentTab("history");
						(0, import_web$33.effect)((_p$) => {
							const _v$ = modal_jsx_default.headerContent, _v$2 = modal_jsx_default.headerTabs, _v$3 = `${modal_jsx_default.tabButton} ${currentTab() === "upload" ? modal_jsx_default.activeTab : ""}`, _v$4 = `${modal_jsx_default.tabButton} ${currentTab() === "history" ? modal_jsx_default.activeTab : ""}`;
							_v$ !== _p$._v$ && (0, import_web$32.className)(_el$, _p$._v$ = _v$);
							_v$2 !== _p$._v$2 && (0, import_web$32.className)(_el$3, _p$._v$2 = _v$2);
							_v$3 !== _p$._v$3 && (0, import_web$32.className)(_el$4, _p$._v$3 = _v$3);
							_v$4 !== _p$._v$4 && (0, import_web$32.className)(_el$5, _p$._v$4 = _v$4);
							return _p$;
						}, {
							_v$: undefined,
							_v$2: undefined,
							_v$3: undefined,
							_v$4: undefined
						});
						(0, import_web$35.runHydrationEvents)();
						return _el$;
					}
				}),
				(0, import_web$31.createComponent)(ModalBody$1, { get children() {
					return [(0, import_web$31.createComponent)(Show$2, {
						get when() {
							return currentTab() === "upload";
						},
						get children() {
							return [
								(() => {
									const _el$6 = (0, import_web$34.getNextElement)(_tmpl$4$1), _el$0 = _el$6.firstChild, [_el$1, _co$] = (0, import_web$28.getNextMarker)(_el$0.nextSibling), _el$9 = _el$1.nextSibling;
									_el$6.$$click = handleUploadClick;
									_el$6.addEventListener("drop", handleDrop);
									_el$6.addEventListener("dragleave", handleDragLeave);
									_el$6.addEventListener("dragover", handleDragOver);
									(0, import_web$29.insert)(_el$6, (0, import_web$31.createComponent)(Show$2, {
										get when() {
											return uploadStatus() !== "uploading";
										},
										get fallback() {
											return (0, import_web$34.getNextElement)(_tmpl$1$1);
										},
										get children() {
											return [(0, import_web$34.getNextElement)(_tmpl$2$2), (() => {
												const _el$8 = (0, import_web$34.getNextElement)(_tmpl$3$1);
												(0, import_web$33.effect)(() => (0, import_web$32.className)(_el$8, modal_jsx_default.uploadInfo));
												return _el$8;
											})()];
										}
									}), _el$1, _co$);
									_el$9.addEventListener("change", handleFileChange);
									const _ref$ = fileInputRef;
									typeof _ref$ === "function" ? (0, import_web$30.use)(_ref$, _el$9) : fileInputRef = _el$9;
									(0, import_web$33.effect)((_p$) => {
										const _v$5 = `${modal_jsx_default.uploadArea} ${isDragOver() ? modal_jsx_default.dragOver : ""} ${uploadStatus() === "uploading" ? modal_jsx_default.uploading : ""}`, _v$6 = uploadStatus() === "uploading";
										_v$5 !== _p$._v$5 && (0, import_web$32.className)(_el$6, _p$._v$5 = _v$5);
										_v$6 !== _p$._v$6 && (_el$9.disabled = _p$._v$6 = _v$6);
										return _p$;
									}, {
										_v$5: undefined,
										_v$6: undefined
									});
									(0, import_web$35.runHydrationEvents)();
									return _el$6;
								})(),
								(0, import_web$31.createComponent)(Show$2, {
									get when() {
										return uploadStatus() === "uploading";
									},
									get children() {
										const _el$10 = (0, import_web$34.getNextElement)(_tmpl$5$1), _el$11 = _el$10.firstChild;
										(0, import_web$33.effect)((_p$) => {
											const _v$7 = modal_jsx_default.progressBar, _v$8 = modal_jsx_default.progressFill, _v$9 = `${uploadProgress()}%`;
											_v$7 !== _p$._v$7 && (0, import_web$32.className)(_el$10, _p$._v$7 = _v$7);
											_v$8 !== _p$._v$8 && (0, import_web$32.className)(_el$11, _p$._v$8 = _v$8);
											_v$9 !== _p$._v$9 && _el$11.style.setProperty("width", _p$._v$9 = _v$9);
											return _p$;
										}, {
											_v$7: undefined,
											_v$8: undefined,
											_v$9: undefined
										});
										return _el$10;
									}
								}),
								(() => {
									const _el$12 = (0, import_web$34.getNextElement)(_tmpl$6$1), _el$13 = _el$12.firstChild, _el$14 = _el$13.nextSibling, _el$15 = _el$14.firstChild, _el$16 = _el$15.nextSibling, _el$17 = _el$16.nextSibling, _el$18 = _el$17.nextSibling;
									_el$15.$$click = () => setUploadDuration(FileLifetime.OneHour);
									_el$16.$$click = () => setUploadDuration(FileLifetime.TwelveHours);
									_el$17.$$click = () => setUploadDuration(FileLifetime.OneDay);
									_el$18.$$click = () => setUploadDuration(FileLifetime.ThreeDays);
									(0, import_web$33.effect)((_p$) => {
										const _v$0 = modal_jsx_default.durationSelector, _v$1 = modal_jsx_default.durationOptions, _v$10 = `${modal_jsx_default.durationOption} ${uploadDuration() === FileLifetime.OneHour ? modal_jsx_default.active : ""}`, _v$11 = uploadStatus() === "uploading", _v$12 = `${modal_jsx_default.durationOption} ${uploadDuration() === FileLifetime.TwelveHours ? modal_jsx_default.active : ""}`, _v$13 = uploadStatus() === "uploading", _v$14 = `${modal_jsx_default.durationOption} ${uploadDuration() === FileLifetime.OneDay ? modal_jsx_default.active : ""}`, _v$15 = uploadStatus() === "uploading", _v$16 = `${modal_jsx_default.durationOption} ${uploadDuration() === FileLifetime.ThreeDays ? modal_jsx_default.active : ""}`, _v$17 = uploadStatus() === "uploading";
										_v$0 !== _p$._v$0 && (0, import_web$32.className)(_el$12, _p$._v$0 = _v$0);
										_v$1 !== _p$._v$1 && (0, import_web$32.className)(_el$14, _p$._v$1 = _v$1);
										_v$10 !== _p$._v$10 && (0, import_web$32.className)(_el$15, _p$._v$10 = _v$10);
										_v$11 !== _p$._v$11 && (_el$15.disabled = _p$._v$11 = _v$11);
										_v$12 !== _p$._v$12 && (0, import_web$32.className)(_el$16, _p$._v$12 = _v$12);
										_v$13 !== _p$._v$13 && (_el$16.disabled = _p$._v$13 = _v$13);
										_v$14 !== _p$._v$14 && (0, import_web$32.className)(_el$17, _p$._v$14 = _v$14);
										_v$15 !== _p$._v$15 && (_el$17.disabled = _p$._v$15 = _v$15);
										_v$16 !== _p$._v$16 && (0, import_web$32.className)(_el$18, _p$._v$16 = _v$16);
										_v$17 !== _p$._v$17 && (_el$18.disabled = _p$._v$17 = _v$17);
										return _p$;
									}, {
										_v$0: undefined,
										_v$1: undefined,
										_v$10: undefined,
										_v$11: undefined,
										_v$12: undefined,
										_v$13: undefined,
										_v$14: undefined,
										_v$15: undefined,
										_v$16: undefined,
										_v$17: undefined
									});
									(0, import_web$35.runHydrationEvents)();
									return _el$12;
								})(),
								(() => {
									const _el$19 = (0, import_web$34.getNextElement)(_tmpl$7$1);
									(0, import_web$29.insert)(_el$19, (0, import_web$31.createComponent)(For, {
										get each() {
											return files();
										},
										children: (file, index) => (() => {
											const _el$35 = (0, import_web$34.getNextElement)(_tmpl$10$1), _el$40 = _el$35.firstChild, [_el$41, _co$6] = (0, import_web$28.getNextMarker)(_el$40.nextSibling), _el$42 = _el$41.nextSibling, [_el$43, _co$7] = (0, import_web$28.getNextMarker)(_el$42.nextSibling), _el$44 = _el$43.nextSibling, [_el$45, _co$8] = (0, import_web$28.getNextMarker)(_el$44.nextSibling), _el$36 = _el$45.nextSibling, _el$37 = _el$36.firstChild, _el$38 = _el$37.nextSibling, _el$39 = _el$36.nextSibling;
											(0, import_web$29.insert)(_el$35, (() => {
												const _c$ = (0, import_web$27.memo)(() => !!file.type.startsWith("image/"));
												return () => _c$() && (() => {
													const _el$46 = (0, import_web$34.getNextElement)(_tmpl$11$1);
													(0, import_web$33.effect)((_p$) => {
														const _v$26 = previews()[index()], _v$27 = file.name, _v$28 = modal_jsx_default.previewImage;
														_v$26 !== _p$._v$26 && (0, import_web$26.setAttribute)(_el$46, "src", _p$._v$26 = _v$26);
														_v$27 !== _p$._v$27 && (0, import_web$26.setAttribute)(_el$46, "alt", _p$._v$27 = _v$27);
														_v$28 !== _p$._v$28 && (0, import_web$32.className)(_el$46, _p$._v$28 = _v$28);
														return _p$;
													}, {
														_v$26: undefined,
														_v$27: undefined,
														_v$28: undefined
													});
													return _el$46;
												})();
											})(), _el$41, _co$6);
											(0, import_web$29.insert)(_el$35, (() => {
												const _c$2 = (0, import_web$27.memo)(() => !!file.type.startsWith("video/"));
												return () => _c$2() && (() => {
													const _el$47 = (0, import_web$34.getNextElement)(_tmpl$11$1);
													(0, import_web$33.effect)((_p$) => {
														const _v$29 = previews()[index()], _v$30 = file.name, _v$31 = modal_jsx_default.previewVideo;
														_v$29 !== _p$._v$29 && (0, import_web$26.setAttribute)(_el$47, "src", _p$._v$29 = _v$29);
														_v$30 !== _p$._v$30 && (0, import_web$26.setAttribute)(_el$47, "alt", _p$._v$30 = _v$30);
														_v$31 !== _p$._v$31 && (0, import_web$32.className)(_el$47, _p$._v$31 = _v$31);
														return _p$;
													}, {
														_v$29: undefined,
														_v$30: undefined,
														_v$31: undefined
													});
													return _el$47;
												})();
											})(), _el$43, _co$7);
											(0, import_web$29.insert)(_el$35, (() => {
												const _c$3 = (0, import_web$27.memo)(() => !!(!file.type.startsWith("image/") && !file.type.startsWith("video/")));
												return () => _c$3() && (() => {
													const _el$48 = (0, import_web$34.getNextElement)(_tmpl$12$1);
													(0, import_web$33.effect)(() => (0, import_web$32.className)(_el$48, modal_jsx_default.previewIcon));
													return _el$48;
												})();
											})(), _el$45, _co$8);
											(0, import_web$29.insert)(_el$37, () => file.name);
											(0, import_web$29.insert)(_el$38, () => formatFileSize(file.size));
											_el$39.$$click = () => handleRemoveFile(index());
											(0, import_web$33.effect)((_p$) => {
												const _v$22 = modal_jsx_default.previewItem, _v$23 = modal_jsx_default.previewItemInfo, _v$24 = modal_jsx_default.removeButton, _v$25 = uploadStatus() === "uploading";
												_v$22 !== _p$._v$22 && (0, import_web$32.className)(_el$35, _p$._v$22 = _v$22);
												_v$23 !== _p$._v$23 && (0, import_web$32.className)(_el$36, _p$._v$23 = _v$23);
												_v$24 !== _p$._v$24 && (0, import_web$32.className)(_el$39, _p$._v$24 = _v$24);
												_v$25 !== _p$._v$25 && (_el$39.disabled = _p$._v$25 = _v$25);
												return _p$;
											}, {
												_v$22: undefined,
												_v$23: undefined,
												_v$24: undefined,
												_v$25: undefined
											});
											(0, import_web$35.runHydrationEvents)();
											return _el$35;
										})()
									}));
									(0, import_web$33.effect)(() => (0, import_web$32.className)(_el$19, modal_jsx_default.previewArea));
									return _el$19;
								})()
							];
						}
					}), (0, import_web$31.createComponent)(Show$2, {
						get when() {
							return currentTab() === "history";
						},
						get children() {
							const _el$20 = (0, import_web$34.getNextElement)(_tmpl$9$1), _el$25 = _el$20.firstChild, [_el$26, _co$2] = (0, import_web$28.getNextMarker)(_el$25.nextSibling), _el$24 = _el$26.nextSibling;
							(0, import_web$29.insert)(_el$20, (0, import_web$31.createComponent)(Show$2, {
								get when() {
									return shelter.plugin.store.uploadHistory.length === 0;
								},
								get children() {
									const _el$21 = (0, import_web$34.getNextElement)(_tmpl$8$1), _el$22 = _el$21.firstChild, _el$23 = _el$22.nextSibling;
									(0, import_web$33.effect)((_p$) => {
										const _v$18 = modal_jsx_default.emptyHistory, _v$19 = modal_jsx_default.uploadInfo;
										_v$18 !== _p$._v$18 && (0, import_web$32.className)(_el$21, _p$._v$18 = _v$18);
										_v$19 !== _p$._v$19 && (0, import_web$32.className)(_el$23, _p$._v$19 = _v$19);
										return _p$;
									}, {
										_v$18: undefined,
										_v$19: undefined
									});
									return _el$21;
								}
							}), _el$26, _co$2);
							(0, import_web$29.insert)(_el$24, (0, import_web$31.createComponent)(For, {
								get each() {
									return shelter.plugin.store.uploadHistory;
								},
								children: (item, index) => {
									const timeRemaining = getTimeRemaining(item.uploadDate, item.duration);
									return (() => {
										const _el$49 = (0, import_web$34.getNextElement)(_tmpl$14), _el$69 = _el$49.firstChild, [_el$70, _co$11] = (0, import_web$28.getNextMarker)(_el$69.nextSibling), _el$51 = _el$70.nextSibling, _el$52 = _el$51.firstChild, _el$53 = _el$52.firstChild, _el$54 = _el$53.nextSibling, _el$55 = _el$52.nextSibling, _el$57 = _el$55.firstChild, [_el$58, _co$9] = (0, import_web$28.getNextMarker)(_el$57.nextSibling), _el$56 = _el$58.nextSibling, _el$59 = _el$56.nextSibling, [_el$60, _co$0] = (0, import_web$28.getNextMarker)(_el$59.nextSibling), _el$65 = _el$55.nextSibling, [_el$66, _co$10] = (0, import_web$28.getNextMarker)(_el$65.nextSibling), _el$67 = _el$51.nextSibling, _el$68 = _el$67.firstChild;
										(0, import_web$29.insert)(_el$49, (0, import_web$31.createComponent)(Show$2, {
											get when() {
												return item.preview;
											},
											get children() {
												const _el$50 = (0, import_web$34.getNextElement)(_tmpl$11$1);
												(0, import_web$33.effect)((_p$) => {
													const _v$32 = item.preview, _v$33 = modal_jsx_default.historyPreview, _v$34 = item.filename;
													_v$32 !== _p$._v$32 && (0, import_web$26.setAttribute)(_el$50, "src", _p$._v$32 = _v$32);
													_v$33 !== _p$._v$33 && (0, import_web$32.className)(_el$50, _p$._v$33 = _v$33);
													_v$34 !== _p$._v$34 && (0, import_web$26.setAttribute)(_el$50, "alt", _p$._v$34 = _v$34);
													return _p$;
												}, {
													_v$32: undefined,
													_v$33: undefined,
													_v$34: undefined
												});
												return _el$50;
											}
										}), _el$70, _co$11);
										(0, import_web$29.insert)(_el$53, () => item.filename);
										(0, import_web$29.insert)(_el$55, () => formatFileSize(item.size), _el$58, _co$9);
										(0, import_web$29.insert)(_el$55, () => formatUploadDate(item.uploadDate), _el$60, _co$0);
										(0, import_web$29.insert)(_el$51, (0, import_web$31.createComponent)(Show$2, {
											when: timeRemaining,
											get children() {
												const _el$61 = (0, import_web$34.getNextElement)(_tmpl$13), _el$62 = _el$61.firstChild, _el$63 = _el$62.nextSibling, [_el$64, _co$1] = (0, import_web$28.getNextMarker)(_el$63.nextSibling);
												(0, import_web$29.insert)(_el$61, timeRemaining, _el$64, _co$1);
												(0, import_web$33.effect)(() => (0, import_web$32.className)(_el$61, modal_jsx_default.historyExpiry));
												return _el$61;
											}
										}), _el$66, _co$10);
										_el$68.$$click = () => copyToClipboard(item.url);
										(0, import_web$33.effect)((_p$) => {
											const _v$35 = modal_jsx_default.historyItem, _v$36 = modal_jsx_default.historyInfo, _v$37 = modal_jsx_default.historyHeader, _v$38 = modal_jsx_default.historyFilename, _v$39 = `${modal_jsx_default.badge} ${modal_jsx_default.badgeAnonymous}`, _v$40 = modal_jsx_default.historyMeta, _v$41 = modal_jsx_default.historyActions, _v$42 = modal_jsx_default.copyButton;
											_v$35 !== _p$._v$35 && (0, import_web$32.className)(_el$49, _p$._v$35 = _v$35);
											_v$36 !== _p$._v$36 && (0, import_web$32.className)(_el$51, _p$._v$36 = _v$36);
											_v$37 !== _p$._v$37 && (0, import_web$32.className)(_el$52, _p$._v$37 = _v$37);
											_v$38 !== _p$._v$38 && (0, import_web$32.className)(_el$53, _p$._v$38 = _v$38);
											_v$39 !== _p$._v$39 && (0, import_web$32.className)(_el$54, _p$._v$39 = _v$39);
											_v$40 !== _p$._v$40 && (0, import_web$32.className)(_el$55, _p$._v$40 = _v$40);
											_v$41 !== _p$._v$41 && (0, import_web$32.className)(_el$67, _p$._v$41 = _v$41);
											_v$42 !== _p$._v$42 && (0, import_web$32.className)(_el$68, _p$._v$42 = _v$42);
											return _p$;
										}, {
											_v$35: undefined,
											_v$36: undefined,
											_v$37: undefined,
											_v$38: undefined,
											_v$39: undefined,
											_v$40: undefined,
											_v$41: undefined,
											_v$42: undefined
										});
										(0, import_web$35.runHydrationEvents)();
										return _el$49;
									})();
								}
							}));
							(0, import_web$33.effect)((_p$) => {
								const _v$20 = modal_jsx_default.historyContainer, _v$21 = modal_jsx_default.historyList;
								_v$20 !== _p$._v$20 && (0, import_web$32.className)(_el$20, _p$._v$20 = _v$20);
								_v$21 !== _p$._v$21 && (0, import_web$32.className)(_el$24, _p$._v$21 = _v$21);
								return _p$;
							}, {
								_v$20: undefined,
								_v$21: undefined
							});
							return _el$20;
						}
					})];
				} }),
				(0, import_web$31.createComponent)(ModalFooter$1, { get children() {
					const _el$27 = (0, import_web$34.getNextElement)(_tmpl$0$1), _el$28 = _el$27.firstChild, [_el$29, _co$3] = (0, import_web$28.getNextMarker)(_el$28.nextSibling), _el$30 = _el$29.nextSibling, [_el$31, _co$4] = (0, import_web$28.getNextMarker)(_el$30.nextSibling), _el$32 = _el$31.nextSibling, [_el$33, _co$5] = (0, import_web$28.getNextMarker)(_el$32.nextSibling);
					(0, import_web$29.insert)(_el$27, (0, import_web$31.createComponent)(Show$2, {
						get when() {
							return uploadStatus() === "uploading";
						},
						get children() {
							return (0, import_web$31.createComponent)(Button$2, {
								get size() {
									return ButtonSizes$2.MEDIUM;
								},
								get color() {
									return ButtonColors$2.RED;
								},
								onClick: () => {
									cancelUpload();
									closeModal();
								},
								children: "Cancel Upload"
							});
						}
					}), _el$29, _co$3);
					(0, import_web$29.insert)(_el$27, (0, import_web$31.createComponent)(Show$2, {
						get when() {
							return uploadStatus() !== "uploading";
						},
						get children() {
							return (0, import_web$31.createComponent)(Button$2, {
								get size() {
									return ButtonSizes$2.MEDIUM;
								},
								get color() {
									return ButtonColors$2.SECONDARY;
								},
								onClick: () => closeModal(),
								children: "Cancel"
							});
						}
					}), _el$31, _co$4);
					(0, import_web$29.insert)(_el$27, (0, import_web$31.createComponent)(Button$2, {
						get disabled() {
							return uploadStatus() === "uploading" || files().length === 0;
						},
						get size() {
							return ButtonSizes$2.MEDIUM;
						},
						get color() {
							return ButtonColors$2.BRAND;
						},
						onClick: handleConfirm,
						get children() {
							return uploadStatus() === "uploading" ? "Uploading..." : "Upload";
						}
					}), _el$33, _co$5);
					(0, import_web$33.effect)(() => (0, import_web$32.className)(_el$27, modal_jsx_default.footer));
					return _el$27;
				} })
			];
		}
	});
}
(0, import_web$25.delegateEvents)(["click"]);

//#endregion
//#region plugins/catbox-upload/choiceModal.jsx
var import_web$15 = __toESM(require_web(), 1);
var import_web$16 = __toESM(require_web(), 1);
var import_web$17 = __toESM(require_web(), 1);
var import_web$18 = __toESM(require_web(), 1);
var import_web$19 = __toESM(require_web(), 1);
var import_web$20 = __toESM(require_web(), 1);
var import_web$21 = __toESM(require_web(), 1);
var import_web$22 = __toESM(require_web(), 1);
var import_web$23 = __toESM(require_web(), 1);
const _tmpl$$3 = /*#__PURE__*/ (0, import_web$15.template)(`<div><p>🐱 Vous êtes sur le point d'uploader <!#><!/> fichier<!#><!/></p><p></p><div><button><div>🐱</div><div><h3>Catbox (Litterbox)</h3><ul><li>✅ Jusqu'à 1GB par fichier</li><li>✅ Lien copié automatiquement</li><li>✅ Historique des uploads</li><li>⏱️ Expiration configurable (1h - 72h)</li></ul></div><div>Recommandé</div></button><button><div>💬</div><div><h3>Discord (Natif)</h3><ul><li>✅ Intégré à Discord</li><li>✅ Permanent (tant que message existe)</li><li>⚠️ Limite de 25MB (ou 500MB Nitro)</li><li>⚠️ Pas d'historique</li></ul></div></button></div></div>`, 50), _tmpl$2$1 = /*#__PURE__*/ (0, import_web$15.template)(`<div><p>💡 Cliquez sur votre choix ci-dessus ou appuyez sur Échap pour annuler</p></div>`, 4);
const { ui: { ModalRoot, ModalHeader, ModalBody, ModalFooter, ModalSizes, Button: Button$1, ButtonColors: ButtonColors$1, ButtonSizes: ButtonSizes$1 }, solid: { createSignal, Show: Show$1 } } = shelter;
function ChoiceModal(closeModal, files, onCatboxChoice, onDiscordChoice) {
	const fileCount = files.length;
	const fileNames = files.map((f) => f.name).join(", ");
	return (0, import_web$23.createComponent)(ModalRoot, {
		get size() {
			return ModalSizes.SMALL;
		},
		get ["class"]() {
			return modal_jsx_default.choiceModal;
		},
		get children() {
			return [
				(0, import_web$23.createComponent)(ModalHeader, {
					close: closeModal,
					children: "Choisir la méthode d'upload"
				}),
				(0, import_web$23.createComponent)(ModalBody, { get children() {
					const _el$ = (0, import_web$19.getNextElement)(_tmpl$$3), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$5 = _el$3.nextSibling, [_el$6, _co$] = (0, import_web$21.getNextMarker)(_el$5.nextSibling), _el$4 = _el$6.nextSibling, _el$7 = _el$4.nextSibling, [_el$8, _co$2] = (0, import_web$21.getNextMarker)(_el$7.nextSibling), _el$9 = _el$2.nextSibling, _el$0 = _el$9.nextSibling, _el$1 = _el$0.firstChild, _el$10 = _el$1.firstChild, _el$11 = _el$10.nextSibling, _el$12 = _el$11.nextSibling, _el$13 = _el$1.nextSibling, _el$14 = _el$13.firstChild, _el$15 = _el$14.nextSibling;
					(0, import_web$22.insert)(_el$2, fileCount, _el$6, _co$);
					(0, import_web$22.insert)(_el$2, fileCount > 1 ? "s" : "", _el$8, _co$2);
					(0, import_web$22.insert)(_el$9, fileNames);
					_el$1.$$click = () => {
						closeModal();
						onCatboxChoice();
					};
					_el$13.$$click = () => {
						closeModal();
						onDiscordChoice();
					};
					(0, import_web$18.effect)((_p$) => {
						const _v$ = modal_jsx_default.choiceContent, _v$2 = modal_jsx_default.choiceTitle, _v$3 = modal_jsx_default.choiceSubtitle, _v$4 = modal_jsx_default.choiceOptions, _v$5 = modal_jsx_default.choiceOption, _v$6 = modal_jsx_default.optionIcon, _v$7 = modal_jsx_default.optionInfo, _v$8 = modal_jsx_default.optionBadge, _v$9 = modal_jsx_default.choiceOption, _v$0 = modal_jsx_default.optionIcon, _v$1 = modal_jsx_default.optionInfo;
						_v$ !== _p$._v$ && (0, import_web$17.className)(_el$, _p$._v$ = _v$);
						_v$2 !== _p$._v$2 && (0, import_web$17.className)(_el$2, _p$._v$2 = _v$2);
						_v$3 !== _p$._v$3 && (0, import_web$17.className)(_el$9, _p$._v$3 = _v$3);
						_v$4 !== _p$._v$4 && (0, import_web$17.className)(_el$0, _p$._v$4 = _v$4);
						_v$5 !== _p$._v$5 && (0, import_web$17.className)(_el$1, _p$._v$5 = _v$5);
						_v$6 !== _p$._v$6 && (0, import_web$17.className)(_el$10, _p$._v$6 = _v$6);
						_v$7 !== _p$._v$7 && (0, import_web$17.className)(_el$11, _p$._v$7 = _v$7);
						_v$8 !== _p$._v$8 && (0, import_web$17.className)(_el$12, _p$._v$8 = _v$8);
						_v$9 !== _p$._v$9 && (0, import_web$17.className)(_el$13, _p$._v$9 = _v$9);
						_v$0 !== _p$._v$0 && (0, import_web$17.className)(_el$14, _p$._v$0 = _v$0);
						_v$1 !== _p$._v$1 && (0, import_web$17.className)(_el$15, _p$._v$1 = _v$1);
						return _p$;
					}, {
						_v$: undefined,
						_v$2: undefined,
						_v$3: undefined,
						_v$4: undefined,
						_v$5: undefined,
						_v$6: undefined,
						_v$7: undefined,
						_v$8: undefined,
						_v$9: undefined,
						_v$0: undefined,
						_v$1: undefined
					});
					(0, import_web$20.runHydrationEvents)();
					return _el$;
				} }),
				(0, import_web$23.createComponent)(ModalFooter, { get children() {
					const _el$16 = (0, import_web$19.getNextElement)(_tmpl$2$1), _el$17 = _el$16.firstChild;
					(0, import_web$18.effect)((_p$) => {
						const _v$10 = modal_jsx_default.choiceFooter, _v$11 = modal_jsx_default.choiceHint;
						_v$10 !== _p$._v$10 && (0, import_web$17.className)(_el$16, _p$._v$10 = _v$10);
						_v$11 !== _p$._v$11 && (0, import_web$17.className)(_el$17, _p$._v$11 = _v$11);
						return _p$;
					}, {
						_v$10: undefined,
						_v$11: undefined
					});
					return _el$16;
				} })
			];
		}
	});
}
(0, import_web$16.delegateEvents)(["click"]);

//#endregion
//#region plugins/catbox-upload/uploadIcon.jsx
var import_web$13 = __toESM(require_web(), 1);
var import_web$14 = __toESM(require_web(), 1);
const _tmpl$$2 = /*#__PURE__*/ (0, import_web$13.template)(`<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M11 4H13V12H16L12 16L8 12H11V4Z"></path><path d="M4 19H20V17H4V19Z"></path><rect x="5" y="20" width="14" height="2" rx="1"></rect></svg>`, 8);
function uploadIcon() {
	return (0, import_web$14.getNextElement)(_tmpl$$2);
}

//#endregion
//#region plugins/catbox-upload/hourglassIcon.jsx
var import_web$11 = __toESM(require_web(), 1);
var import_web$12 = __toESM(require_web(), 1);
const _tmpl$$1 = /*#__PURE__*/ (0, import_web$11.template)(`<svg aria-hidden="true" role="img" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22h14"></path><path d="M5 2h14"></path><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"></path><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>`, 10);
function hourglassIcon() {
	return (0, import_web$12.getNextElement)(_tmpl$$1);
}

//#endregion
//#region plugins/catbox-upload/index.jsx
var import_web = __toESM(require_web(), 1);
var import_web$1 = __toESM(require_web(), 1);
var import_web$2 = __toESM(require_web(), 1);
var import_web$3 = __toESM(require_web(), 1);
var import_web$4 = __toESM(require_web(), 1);
var import_web$5 = __toESM(require_web(), 1);
var import_web$6 = __toESM(require_web(), 1);
var import_web$7 = __toESM(require_web(), 1);
var import_web$8 = __toESM(require_web(), 1);
var import_web$9 = __toESM(require_web(), 1);
var import_web$10 = __toESM(require_web(), 1);
const _tmpl$ = /*#__PURE__*/ (0, import_web.template)(`<button></button>`, 2), _tmpl$2 = /*#__PURE__*/ (0, import_web.template)(`<style>
         [class^="_modal"] {
            width: auto;
         }
         </style>`, 2), _tmpl$3 = /*#__PURE__*/ (0, import_web.template)(`<strong>1GB</strong>`, 2), _tmpl$4 = /*#__PURE__*/ (0, import_web.template)(`<br>`, 1), _tmpl$5 = /*#__PURE__*/ (0, import_web.template)(`<strong>Upload Duration:</strong>`, 2), _tmpl$6 = /*#__PURE__*/ (0, import_web.template)(`<strong>1h, 12h, 24h, or 72h</strong>`, 2), _tmpl$7 = /*#__PURE__*/ (0, import_web.template)(`<strong>Features:</strong>`, 2), _tmpl$8 = /*#__PURE__*/ (0, import_web.template)(`<strong>Upload Large Files:</strong>`, 2), _tmpl$9 = /*#__PURE__*/ (0, import_web.template)(`<strong>Anonymous Uploads:</strong>`, 2), _tmpl$0 = /*#__PURE__*/ (0, import_web.template)(`<strong>Drag & Drop:</strong>`, 2), _tmpl$1 = /*#__PURE__*/ (0, import_web.template)(`<strong>History:</strong>`, 2), _tmpl$10 = /*#__PURE__*/ (0, import_web.template)(`<style>
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
         </style>`, 2), _tmpl$11 = /*#__PURE__*/ (0, import_web.template)(`<div class="catbox-settings-section"><h3>🎯 Interception des uploads</h3><p>Interceptez les uploads Discord pour choisir entre Catbox et Discord</p><label class="catbox-checkbox-container"><div class="catbox-checkbox-wrapper"><input type="checkbox"><span class="catbox-checkbox-slider"></span></div><span class="catbox-checkbox-label">📋 Intercepter Ctrl+V (collage de fichiers)</span></label><label class="catbox-checkbox-container"><div class="catbox-checkbox-wrapper"><input type="checkbox"><span class="catbox-checkbox-slider"></span></div><span class="catbox-checkbox-label">➕ Intercepter le bouton d'upload Discord</span></label></div>`, 24), _tmpl$12 = /*#__PURE__*/ (0, import_web.template)(`<div class="catbox-settings-section"><h3>⌨️ Raccourci clavier</h3><p>Définissez un raccourci pour ouvrir directement la modale Catbox</p><!#><!/><p class="catbox-keybind-hint">💡 Format : ctrl+shift+u, alt+u, ctrl+alt+shift+c, etc.</p></div>`, 10);
const { observeDom } = shelter.plugin.scoped;
const { ui: { openModal, showToast, Header, HeaderTags, Text, TextBox, Button, ButtonSizes, ButtonColors, focusring }, solid: { Show, render, createEffect, untrack }, plugin } = shelter;
const { subscribe } = shelter.plugin.scoped.flux;
function uploadButton() {
	return (() => {
		const _el$ = (0, import_web$6.getNextElement)(_tmpl$);
		_el$.$$click = () => {
			openModal((p) => UploadModal(p.close, []));
		};
		(0, import_web$10.use)(focusring, _el$, () => true);
		(0, import_web$8.insert)(_el$, (0, import_web$9.createComponent)(Show, {
			get when() {
				return uploadStatus() === "uploading";
			},
			get fallback() {
				return (0, import_web$9.createComponent)(uploadIcon, {});
			},
			get children() {
				return (0, import_web$9.createComponent)(hourglassIcon, {});
			}
		}));
		(0, import_web$5.effect)((_p$) => {
			const _v$ = modal_jsx_default.replacedButton, _v$2 = uploadStatus() === "uploading" ? `Upload en cours... ${Math.round(uploadProgress())}%` : "Upload to Catbox";
			_v$ !== _p$._v$ && (0, import_web$4.className)(_el$, _p$._v$ = _v$);
			_v$2 !== _p$._v$2 && (0, import_web$3.setAttribute)(_el$, "title", _p$._v$2 = _v$2);
			return _p$;
		}, {
			_v$: undefined,
			_v$2: undefined
		});
		(0, import_web$7.runHydrationEvents)();
		return _el$;
	})();
}
let interceptState = {
	pasteEnabled: false,
	fileInputEnabled: false
};
function handlePaste(event) {
	const isPaste = event.type === "paste";
	const isDrop = event.type === "drop";
	if (isPaste && !interceptState.pasteEnabled) return;
	if (isDrop && !interceptState.fileInputEnabled) return;
	const items = isPaste ? event.clipboardData?.items : event.dataTransfer?.items;
	if (!items) return;
	const files = [];
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		if (item.kind === "file") {
			const file = item.getAsFile();
			if (file) files.push(file);
		}
	}
	const allowedFiles = files.filter(isFileTypeAllowed);
	if (allowedFiles.length < files.length) showToast({
		title: "Fichiers ignorés",
		content: "Certains types de fichiers ne sont pas autorisés (.exe, .scr, .cpl, .doc*, .jar)"
	});
	if (allowedFiles.length > 0) {
		event.preventDefault();
		event.stopPropagation();
		openModal((p) => ChoiceModal(
			p.close,
			allowedFiles,
			// Catbox choice
			() => {
				openModal((p2) => UploadModal(p2.close, allowedFiles));
			},
			// Discord choice
			() => {
				if (isPaste) {
					interceptState.pasteEnabled = false;
					setTimeout(() => {
						const textarea = document.querySelector("[class*=\"textArea\"]");
						if (textarea) {
							const dataTransfer = new DataTransfer();
							allowedFiles.forEach((file) => dataTransfer.items.add(file));
							const dropEvent = new DragEvent("drop", {
								bubbles: true,
								cancelable: true,
								dataTransfer
							});
							textarea.dispatchEvent(dropEvent);
						}
						interceptState.pasteEnabled = plugin.store.interceptPaste;
					}, 100);
				} else if (isDrop) {
					interceptState.fileInputEnabled = false;
					setTimeout(() => {
						const input = document.querySelector("input[type=\"file\"]");
						if (input) {
							const dataTransfer = new DataTransfer();
							allowedFiles.forEach((file) => dataTransfer.items.add(file));
							input.files = dataTransfer.files;
							input.dispatchEvent(new Event("change", { bubbles: true }));
							input.dispatchEvent(new Event("input", { bubbles: true }));
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
	if (!input.closest("[class*=\"channelTextArea\"]") && !input.closest("[class*=\"attachButton\"]")) return;
	const files = Array.from(input.files);
	const allowedFiles = files.filter(isFileTypeAllowed);
	if (allowedFiles.length < files.length) showToast({
		title: "Fichiers ignorés",
		content: "Certains types de fichiers ne sont pas autorisés (.exe, .scr, .cpl, .doc*, .jar)"
	});
	if (allowedFiles.length === 0) return;
	const dataTransfer = new DataTransfer();
	allowedFiles.forEach((file) => dataTransfer.items.add(file));
	event.preventDefault();
	event.stopPropagation();
	openModal((p) => ChoiceModal(
		p.close,
		allowedFiles,
		// Catbox choice
		() => {
			openModal((p2) => UploadModal(p2.close, allowedFiles));
			input.value = "";
		},
		// Discord choice
		() => {
			input.value = "";
			interceptState.fileInputEnabled = false;
			setTimeout(() => {
				input.files = dataTransfer.files;
				input.dispatchEvent(new Event("change", { bubbles: true }));
				input.dispatchEvent(new Event("input", { bubbles: true }));
				setTimeout(() => {
					interceptState.fileInputEnabled = plugin.store.interceptFileInput;
				}, 100);
			}, 50);
		}
));
}
function handleKeybind(event) {
	const keybind = plugin.store.uploadKeybind || "ctrl+shift+u";
	const keys = keybind.toLowerCase().split("+");
	const ctrlRequired = keys.includes("ctrl");
	const shiftRequired = keys.includes("shift");
	const altRequired = keys.includes("alt");
	const mainKey = keys.find((k) => ![
		"ctrl",
		"shift",
		"alt"
	].includes(k));
	if (!mainKey) return;
	const keyMatch = event.key.toLowerCase() === mainKey.toLowerCase();
	const ctrlMatch = !ctrlRequired || event.ctrlKey || event.metaKey;
	const shiftMatch = !shiftRequired || event.shiftKey;
	const altMatch = !altRequired || event.altKey;
	if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
		event.preventDefault();
		openModal((p) => UploadModal(p.close, []));
	}
}
function onLoad() {
	plugin.store.previews ??= {};
	plugin.store.interceptPaste ??= true;
	plugin.store.interceptFileInput ??= true;
	plugin.store.uploadKeybind ??= "ctrl+shift+u";
	interceptState.pasteEnabled = plugin.store.interceptPaste;
	interceptState.fileInputEnabled = plugin.store.interceptFileInput;
	document.addEventListener("paste", handlePaste, true);
	document.addEventListener("drop", handlePaste, true);
	document.addEventListener("dragover", (e) => e.preventDefault(), true);
	document.addEventListener("change", handleFileInput, true);
	document.addEventListener("keydown", handleKeybind, true);
	subscribe("CHANNEL_SELECT", () => {
		let unobserve = observeDom("[class^=\"inner\"] > [class^=\"buttons\"], [class^=\"accessoryBarRight\"]", (element) => {
			if (element.dataset.catboxUpload) return;
			unobserve();
			element.dataset.catboxUpload = true;
			const container = document.createElement("div");
			container.style.display = "inline-flex";
			element.prepend(container);
			render(() => uploadButton(), container);
		});
		setTimeout(() => unobserve(), 2e3);
	});
}
function onUnload() {
	document.removeEventListener("paste", handlePaste, true);
	document.removeEventListener("drop", handlePaste, true);
	document.removeEventListener("dragover", (e) => e.preventDefault(), true);
	document.removeEventListener("change", handleFileInput, true);
	document.removeEventListener("keydown", handleKeybind, true);
}
const settings = () => [
	(0, import_web$6.getNextElement)(_tmpl$2),
	(0, import_web$9.createComponent)(Text, { get children() {
		return [
			"This plugin allows you to upload anonymous files up to ",
			(0, import_web$6.getNextElement)(_tmpl$3),
			" directly to Litterbox (Catbox.moe) from Discord.",
			(0, import_web$6.getNextElement)(_tmpl$4),
			(0, import_web$6.getNextElement)(_tmpl$4),
			(0, import_web$6.getNextElement)(_tmpl$5),
			(0, import_web$6.getNextElement)(_tmpl$4),
			"• Choose between ",
			(0, import_web$6.getNextElement)(_tmpl$6),
			" expiration.",
			(0, import_web$6.getNextElement)(_tmpl$4),
			(0, import_web$6.getNextElement)(_tmpl$4),
			(0, import_web$6.getNextElement)(_tmpl$7),
			(0, import_web$6.getNextElement)(_tmpl$4),
			"• ",
			(0, import_web$6.getNextElement)(_tmpl$8),
			" Share files up to 1GB directly from Discord.",
			(0, import_web$6.getNextElement)(_tmpl$4),
			"• ",
			(0, import_web$6.getNextElement)(_tmpl$9),
			" Temporary uploads with configurable expiration.",
			(0, import_web$6.getNextElement)(_tmpl$4),
			"• ",
			(0, import_web$6.getNextElement)(_tmpl$0),
			" Modern and intuitive file upload experience.",
			(0, import_web$6.getNextElement)(_tmpl$4),
			"• ",
			(0, import_web$6.getNextElement)(_tmpl$1),
			" Keep track of your uploads.",
			(0, import_web$6.getNextElement)(_tmpl$4),
			(0, import_web$6.getNextElement)(_tmpl$4)
		];
	} }),
	(0, import_web$6.getNextElement)(_tmpl$10),
	(() => {
		const _el$21 = (0, import_web$6.getNextElement)(_tmpl$11), _el$22 = _el$21.firstChild, _el$23 = _el$22.nextSibling, _el$24 = _el$23.nextSibling, _el$25 = _el$24.firstChild, _el$26 = _el$25.firstChild, _el$27 = _el$24.nextSibling, _el$28 = _el$27.firstChild, _el$29 = _el$28.firstChild;
		_el$26.addEventListener("change", (e) => {
			plugin.store.interceptPaste = e.target.checked;
			interceptState.pasteEnabled = e.target.checked;
			showToast({
				title: "Interception Ctrl+V",
				content: e.target.checked ? "✅ Activée" : "❌ Désactivée"
			});
		});
		_el$29.addEventListener("change", (e) => {
			plugin.store.interceptFileInput = e.target.checked;
			interceptState.fileInputEnabled = e.target.checked;
			showToast({
				title: "Interception Upload",
				content: e.target.checked ? "✅ Activée" : "❌ Désactivée"
			});
		});
		(0, import_web$5.effect)(() => _el$26.checked = plugin.store.interceptPaste);
		(0, import_web$5.effect)(() => _el$29.checked = plugin.store.interceptFileInput);
		return _el$21;
	})(),
	(() => {
		const _el$30 = (0, import_web$6.getNextElement)(_tmpl$12), _el$31 = _el$30.firstChild, _el$32 = _el$31.nextSibling, _el$34 = _el$32.nextSibling, [_el$35, _co$] = (0, import_web$2.getNextMarker)(_el$34.nextSibling), _el$33 = _el$35.nextSibling;
		(0, import_web$8.insert)(_el$30, (0, import_web$9.createComponent)(TextBox, {
			"class": "catbox-keybind-input",
			placeholder: "ctrl+shift+u",
			get value() {
				return plugin.store.uploadKeybind;
			},
			onInput: (v) => {
				plugin.store.uploadKeybind = v.toLowerCase();
				showToast({
					title: "Raccourci mis à jour",
					content: `Nouveau raccourci : ${v}`
				});
			}
		}), _el$35, _co$);
		return _el$30;
	})(),
	(0, import_web$6.getNextElement)(_tmpl$4),
	(0, import_web$6.getNextElement)(_tmpl$4)
];
(0, import_web$1.delegateEvents)(["click"]);

//#endregion
exports.onLoad = onLoad
exports.onUnload = onUnload
exports.settings = settings
return exports;
})({});