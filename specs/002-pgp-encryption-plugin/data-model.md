# PGPCord Data Models

This document defines the key data entities required for the PGPCord feature. These models are conceptual and do not represent a specific database schema directly, but rather the structure of data as handled within the plugin.

## 1. User Key Pair (LocalStorage)

Represents the user's own PGP identity, stored locally on their device.

-   **Storage**: Browser LocalStorage, managed by Shelter's data management utilities.
-   **Key**: A designated key, e.g., `pgpcord_keys`.

| Attribute | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `publicKey` | String | The user's public PGP key, in ASCII-armored format. | Yes |
| `privateKey` | String | The user's private PGP key, encrypted with their passphrase and stored in ASCII-armored format. | Yes |
| `keyId` | String | The short, unique identifier for the PGP key pair. | Yes |

## 2. Public Key Record (Backend)

Represents a user's public identity, stored in the Supabase backend to allow other users to find their key.

-   **Storage**: Supabase PostgreSQL table named `user_keys`.

| Column | Type | Description | Required |
| :--- | :--- | :--- | :--- |
| `discord_id` | `bigint` / `text` | The user's unique Discord ID. This is the Primary Key. | Yes |
| `public_key` | `text` | The user's public PGP key, in ASCII-armored format. | Yes |
| `updated_at` | `timestamp` | Timestamp of the last update. | Yes |

## 3. Plugin Settings (LocalStorage)

Represents the user's configured preferences for the plugin's behavior.

-   **Storage**: Browser LocalStorage, managed by Shelter's data management utilities.
-   **Key**: A designated key, e.g., `pgpcord_settings`.

| Setting | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `cacheDuration` | Enum | Determines how long the unlocked private key is cached. | `'session'` |
| `cacheTimeMinutes` | Number | If `cacheDuration` is `'time'`, this specifies the duration in minutes. | `15` |

### `cacheDuration` Enum Options

| Value | Description |
| :--- | :--- |
| `'session'` | Cache the unlocked key for the entire Discord session. |
| `'time'` | Cache the unlocked key for a specific number of minutes (`cacheTimeMinutes`). |
| `'none'` | Do not cache the key. Prompt for passphrase on every use. |
