# 🐱 Catbox Uploader - Shelter Plugin

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SolidJS](https://img.shields.io/badge/SolidJS-1c4f7c?style=for-the-badge&logo=solid&logoColor=white)
![Shelter](https://img.shields.io/badge/Shelter-Plugin-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Upload files up to 200MB directly to Catbox.moe from Discord! Bypass Discord's file size limits with ease.

> **Upload anonymously or with your Catbox account!**

Catbox Uploader integrates seamlessly into Discord's chat interface, allowing you to share large files without any hassle. Files are hosted on Catbox.moe/Litterbox, providing reliable and fast file sharing.

---

## ✨ Features

- [x] **Upload Large Files**: Share files up to 200MB directly from Discord.
- [x] **Anonymous Uploads**: Quick 72-hour temporary uploads (CORS-compatible).
- [x] **Inspired by node-catbox**: Browser-compatible implementation following node-catbox architecture.
- [x] **Drag & Drop Interface**: Modern and intuitive file upload experience.
- [x] **Real-time Progress**: Track your upload progress with a visual progress bar.
- [x] **Image/Video Preview**: Preview your files before uploading.
- [x] **Auto Link Insertion**: Links are automatically inserted in your message.
- [x] **No CORS Issues**: Uses Litterbox API which works seamlessly in browsers.

---

## 🛠️ Requirements

- **Shelter**: Included with [Legcord](https://legcord.app/) or install into most Discord clients (Vencord, etc.).

## 📦 Installation

### Option 1: Shelter Plugin Browser
1.  Open **User Settings** -> **Shelter** -> **Plugins**.
2.  Search for `Catbox Uploader` (if available in the official list).
3.  Click **Install**.

### Option 2: Manual Install
1.  Open **User Settings** -> **Shelter** -> **Plugins**.
2.  Click **Add Plugin** (or "Add by URL").
3.  Paste the following URL:
    ```
    https://corploc.github.io/shelter-plugins/catbox-upload/
    ```
4.  Click **Add Plugin**.

---

## 🚀 Usage

### 1. Find the Upload Button
Look for the **cat icon with an upload arrow** in the Discord chat input bar (left of the GIF/emoji buttons).

### 2. Upload Files
- **Click the button** to open the upload modal
- **Drag & drop** files into the modal, or click to select files
- Files are previewed before upload
- Click **Upload** to send files to Catbox/Litterbox

### 3. Configure (Optional)
Go to **Settings > Catbox Uploader**.

#### Anonymous Uploads (Default)
- No configuration needed
- Files uploaded to **Litterbox** with browser-compatible implementation
- Files expire after **72 hours** (maximum for Litterbox)
- CORS-compatible, works everywhere

> **Note**: User Hash configuration is preserved for potential future Catbox.moe integration, but Litterbox (used for CORS compatibility) has a maximum retention of 72 hours regardless of account status.

---

## 💻 Development

### Prerequisites
-   **Git**
-   **Node.js**
-   **Lune**: `npm install -g @uwu/lune`

### Setup
```bash
git clone https://github.com/corploc/shelter-plugins.git
cd shelter-plugins/
npm install
```

### Building
```bash
npx lune build catbox-upload
```

---

### Technical Details

- Browser-compatible implementation inspired by **node-catbox** architecture
- Uses native browser File API and FormData for uploads
- Files are temporary with maximum 72h retention (Litterbox limitation)
- Maximum file size is 200MB (Litterbox limitation)
- No file management features (Litterbox doesn't provide these APIs)
- Clean API abstraction following node-catbox patterns

---

## 📄 License

This project is licensed under the MIT License.
