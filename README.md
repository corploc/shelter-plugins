# Shelter Plugins

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SolidJS](https://img.shields.io/badge/SolidJS-2c4f7c?style=for-the-badge&logo=solid&logoColor=white)
![Shelter](https://img.shields.io/badge/Shelter-Plugin-blueviolet?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

This repository contains plugins for [Shelter](https://github.com/uwu/shelter).

## Plugins

### [PGPCord](./plugins/pgpcord)
End-to-End Encryption (E2EE) for Discord using the OpenPGP standard.

### [Catbox Uploader](./plugins/catbox-upload)
Upload files up to 1GB directly to Litterbox (Catbox.moe) from Discord. Bypass Discord's file size limits with anonymous temporary uploads.



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
To build a specific plugin:
```bash
npx lune build [plugin_name]
```
Example: `npx lune build pgpcord`

### Development
To start the development server for a plugin:
```bash
npx lune dev [plugin_name]
```
Example: `npx lune dev pgpcord`

## 📄 License

This project is licensed under the MIT License.
