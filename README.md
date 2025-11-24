# pgpcord

This is the repository for the pgpcord project.

## Description

pgpcord is a security-focused Vencord plugin that brings PGP encryption to your Discord communications.

## Guiding Principles

This project is governed by a strict, security-first constitution. Key principles include:

- **Security-First**: No unencrypted message content ever touches the Discord API. Private keys are stored locally and are themselves encrypted.
- **Architecture**: A unified architecture based on Lune and Shelter.ui (SolidJS) to ensure maintainability.
- **Minimal Backend**: The backend is used exclusively for public key exchange and identity verification.
- **Lifecycle Safety**: Rigorous cleanup of all patches and observers to prevent memory leaks.
- **User Trust**: A clear and unambiguous UI to prevent accidental leakage of sensitive information.

For the full list of rules, see the [project constitution](./specs/002-pgp-encryption-plugin/constitution.md).

## Installation

You can install PGPCord directly into your Shelter/Vencord client using the repository URL.

1.  Open **User Settings** in your client (e.g., Legcord).
2.  Navigate to **Shelter** > **Settings**.
3.  In the **Plugins** section, find the option to **Add Plugin** (or "Add by URL").
4.  Paste the following GitHub URL:
    ```
    https://github.com/Zerostats/pgpcord
    ```
5.  Click **Add Plugin**.

## Usage

1.  After installation, go to **Settings > Plugins** and find **PGPCord**.
2.  Generate a new PGP key pair and set a strong passphrase. This passphrase encrypts your private key on your device. **If you forget it, your keys are unrecoverable.**
3.  Once keys are generated, your public key is automatically published.
4.  In any chat, you will see a **lock icon** in the chat bar. Click it to toggle **Secure Mode**.
5.  When the lock is closed (green), your messages will be encrypted. When it is open, messages will be sent as normal.
6.  Incoming encrypted messages will be automatically decrypted and displayed in a distinct frame.

## Development

### Prerequisites

-   **Git**
-   **Node.js** and a package manager (`npm`, `pnpm`, etc.)
-   **Lune**: The build tool for Shelter plugins. Follow the installation instructions in the `spikehd/shelter-plugins` repository.
-   A Vencord/Shelter Discord Client for testing.

### Setup

1.  **Clone & Install**:
    ```bash
    # Clone the repository
    git clone https://github.com/Zerostats/pgpcord.git
    cd pgpcord

    # Install dependencies
    npm install
    ```

2.  **Supabase Setup**:
    -   Create a new project at [supabase.com](https://supabase.com).
    -   In the SQL Editor, run the schema from `specs/002-pgp-encryption-plugin/contracts/supabase.md` to create the `user_keys` table and its security policies.
    -   Go to **Authentication > Providers** and enable the **Discord** provider. You will need a Client ID and Secret from a Discord OAuth2 application.
    -   Go to **Project Settings > API** and find your Project URL and `anon` public key.

3.  **Configure Environment**:
    -   Open `plugins/pgpcord/lib/api.ts`.
    -   Replace the placeholder `YOUR_SUPABASE_URL` and `YOUR_SUPABASE_ANON_KEY` values with your actual Supabase credentials.

### Building

To build the plugin, run the following command from the project root:

```bash
npx lune build pgpcord
```
*(Note: This assumes `lune` is available in your path or you are using `npx` with it installed locally. You may need to adjust based on your Lune setup.)*

This will create a `dist` folder inside `plugins/pgpcord` containing the bundled plugin.

## Contributing

Guidelines for contributing to the project.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
