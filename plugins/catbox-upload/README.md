# 🐱 Catbox Uploader - Shelter Plugin

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SolidJS](https://img.shields.io/badge/SolidJS-1c4f7c?style=for-the-badge&logo=solid&logoColor=white)
![Shelter](https://img.shields.io/badge/Shelter-Plugin-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Upload files up to **1GB** directly to Litterbox (Catbox.moe) from Discord! Bypass Discord's file size limits with ease.

> **Fast, Anonymous, and Temporary File Hosting**

Catbox Uploader integrates seamlessly into Discord's chat interface, allowing you to share large files without any hassle. Files are hosted on Litterbox, providing reliable and fast temporary file sharing.

---

## ✨ Features

- [x] **Upload Huge Files**: Share files up to **1GB** directly from Discord.
- [x] **Configurable Expiration**: Choose between **1h, 12h, 24h, or 72h** retention.
- [x] **Anonymous Uploads**: No account required, purely temporary hosting.
- [x] **Drag & Drop Interface**: Modern and intuitive file upload experience.
- [x] **Real-time Progress**: Track your upload progress with a visual progress bar.
- [x] **Image/Video Preview**: Preview your files before uploading.
- [x] **Auto Link Insertion**: Links are automatically inserted in your message.
- [x] **Upload History**: Keep track of your recent uploads and their expiration status.
- [x] **Smart Interception**: Optional interception of Paste (Ctrl+V) and File Input events.

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
Look for the **cat icon with an upload arrow** in the Discord chat input bar (left of the GIF/emoji buttons). Alternatively, use the configured keybind (default: `Ctrl+Shift+U`).

### 2. Upload Files
- **Click the button** to open the upload modal.
- **Drag & drop** files into the modal, or click to select files.
- **Select Expiration**: Choose how long the file should last (1h, 12h, 24h, or 72h).
- Click **Upload** to send files to Litterbox.

### 3. Interception (Optional)
Go to **Settings > Catbox Uploader** to configure:
- **Paste Interception**: Automatically offer to upload to Catbox when pasting files (Ctrl+V).
- **Upload Button Interception**: Intercept the standard Discord upload button.

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
- Files are temporary with configurable retention (1h to 72h)
- Maximum file size is **1GB** (Litterbox limitation)
- Direct communication with Litterbox API (No proxy required)

### Inspiration
- **External Upload** by [xirreal-plugins](https://github.com/xirreal-plugins)

---

## 📄 License

This project is licensed under the MIT License.
