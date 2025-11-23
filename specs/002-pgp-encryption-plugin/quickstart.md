# Quickstart: PGPCord Development

This guide provides the basic steps to set up a local development environment for the PGPCord plugin.

## Prerequisites

1.  **Git**: For cloning the repository.
2.  **Node.js & npm/pnpm/yarn**: For installing dependencies.
3.  **Lune**: The build tool for Shelter plugins. Follow the installation instructions in the `spikehd/shelter-plugins` repository.
4.  **A Vencord/Shelter Discord Client**: You need a modded Discord client to load the plugin.

## Setup

1.  **Clone the monorepo**:
    If you haven't already, clone the `shelter-plugins` repository which contains this project.

    ```bash
    git clone <monorepo_url>
    cd <monorepo_url>
    ```

2.  **Install Dependencies**:
    Install the dependencies for the entire monorepo from the root directory.

    ```bash
    pnpm install
    ```

3.  **Supabase Setup**:
    - You will need a Supabase project. Create one at [supabase.com](https://supabase.com).
    - In your project's SQL Editor, run the scripts from `specs/002-pgp-encryption-plugin/contracts/supabase.md` to create the `user_keys` table and enable Row Level Security.
    - Go to `Authentication -> Providers` and enable the **Discord** provider. You will need to provide a Client ID and Client Secret from a Discord OAuth2 application.
    - In your Supabase project settings (`API` section), find your Project URL and your `anon` public key.

4.  **Configure Environment**:
    The plugin will need to know your Supabase URL and anon key. The exact method for providing these to a Shelter plugin can vary. A common method is to have a local configuration file that is not checked into source control, which the plugin reads during development.

    *Example*: In `plugins/pgpcord/index.tsx`, you might have placeholders:
    ```typescript
    const SUPABASE_URL = "YOUR_SUPABASE_URL";
    const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
    ```
    Replace these with your actual Supabase credentials for local testing.

## Building and Running

1.  **Build the plugin**:
    Use Lune to build the PGPCord plugin. Run this command from the monorepo root:

    ```bash
    lune build pgpcord
    ```

2.  **Load the plugin in Discord**:
    - Open your Vencord/Shelter client.
    - Navigate to the plugins settings.
    - Load the newly built plugin from the `dist` directory within the `pgpcord` plugin folder.

You should now see the PGPCord settings in your Discord settings panel, and the secure mode toggle should appear in the chat bar.
