# Feature Specification: PGP Encryption for Discord (PGPCord)

**Feature Branch**: `002-pgp-encryption-plugin`
**Created**: 2025-11-22
**Status**: Draft
**Input**: User description: "Create a Vencord/Shelter plugin named "PGPCord". **Goal**: Enable end-to-end PGP encryption within Discord. **Core Features**: 1. **Key Management (Settings Panel)**: - Generate RSA 4096/ECC keys via `openpgp.js`. - Local storage of private keys (encrypted with user passphrase). - Publish public key to Supabase backend after Discord OIDC verification. 2. **Secure Mode (Chat UI)**: - A toggle button (Lock icon) in the chat bar. - **ON State**: TextArea turns green/distinct style. Sent messages are encrypted for all recipients + sender. - **OFF State**: Standard Discord behavior. 3. **Message Handling**: - Intercept incoming messages. - If PGP block detected AND key available -> Decrypt and display in a distinct frame. - If PGP block detected AND key missing/locked -> Show "🔒 Encrypted Message" placeholder. - Never display decrypted content in the raw DOM if possible (use Shadow DOM or ephemeral state). **Backend Interaction**: - Supabase table `user_keys` (discord_id, public_key). - Row Level Security: Public read, Owner write (via OIDC auth)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Key Setup and Management (Priority: P1)

A new user wants to set up encryption. They navigate to the plugin's settings panel, generate a new PGP key pair, secure their private key with a passphrase they choose, and publish their public key so others can send them encrypted messages.

**Why this priority**: This is the foundational step. Without keys, no other encryption functionality is possible.

**Independent Test**: Can be fully tested by verifying that a new key pair is created, the public key is published to the backend, and the (encrypted) private key is stored locally, all without interacting with the chat UI.

**Acceptance Scenarios**:

1.  **Given** a user has not yet generated keys, **When** they open the PGPCord settings and click "Generate Keys", **Then** they are prompted to enter and confirm a passphrase.
2.  **Given** the user has entered a valid passphrase, **When** the key generation completes, **Then** their public key is published to the backend, associated with their Discord ID.
3.  **Given** key generation is complete, **When** the user inspects the plugin's local storage, **Then** they find their private key is stored in an encrypted format.

---

### User Story 2 - Sending and Receiving Encrypted Messages (Priority: P1)

A user wants to send a secure message. They enable "Secure Mode" in a chat, type their message, and send it. The recipient, who also has the plugin, sees the message decrypted seamlessly in their chat window.

**Why this priority**: This is the core feature and the primary value proposition of the plugin.

**Independent Test**: Can be tested with two users who have already completed User Story 1. User A sends an encrypted message to User B, and success is measured by User B's ability to read it.

**Acceptance Scenarios**:

1.  **Given** a user is in a chat and "Secure Mode" is OFF, **When** they click the Lock icon, **Then** "Secure Mode" is enabled and the text area style changes.
2.  **Given** "Secure Mode" is ON and the user sends a message, **When** the recipient (with a valid key) receives the message, **Then** the decrypted content is displayed within a distinct, secure frame.
3.  **Given** a user receives an encrypted message, **When** their private key is locked, **Then** they are prompted for their passphrase to unlock it and view the message.

---

### User Story 3 - Handling Inaccessible Encrypted Messages (Priority: P2)

A user receives a message that was encrypted with PGP, but they either don't have the corresponding private key or choose not to unlock it.

**Why this priority**: This ensures a graceful failure state, preventing user confusion from seeing raw PGP blocks and maintaining a clean UI.

**Independent Test**: Can be tested by sending an encrypted message to a user who has not set up keys, or by having a user with keys refuse the passphrase prompt.

**Acceptance Scenarios**:

1.  **Given** a user has not set up PGPCord, **When** they view a channel with a PGPCord-encrypted message, **Then** they see a placeholder stating "🔒 Encrypted Message".
2.  **Given** a user has a locked private key, **When** they are prompted for their passphrase and cancel, **Then** the message remains hidden behind the "🔒 Encrypted Message" placeholder.

---

### User Story 4 - Configuring Passphrase Caching (Priority: P3)

A user wants to adjust the security/convenience tradeoff for their private key. They navigate to the settings panel and select their preferred duration for how long their passphrase remains valid.

**Why this priority**: This is a quality-of-life feature that gives users control over their own security posture, but it is not essential for the core encryption functionality to work.

**Independent Test**: Can be tested by changing the setting and observing the passphrase prompt behavior over time or across sessions. For example, setting it to "no caching" and verifying the user is prompted for every single decryption.

**Acceptance Scenarios**:

1.  **Given** the user is in the PGPCord settings panel, **When** they navigate to the security section, **Then** they see a dropdown or radio button group to select the passphrase caching duration.
2.  **Given** the user selects the "time-based" caching option, **When** they do so, **Then** an input field appears allowing them to set a timeout duration in minutes.
3.  **Given** the user has set the caching duration, **When** they use the plugin, **Then** the passphrase prompting behavior honors the selected setting.

---

### Edge Cases

-   What happens when a user forgets their private key passphrase? (The key is unrecoverable).
-   How does the system behave if the public key backend is offline?
-   What happens if a message is edited? (Encrypted messages likely cannot be "edited" in the traditional Discord sense).
-   How are very long messages handled by the encryption/decryption process?

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The system MUST allow users to generate a PGP key pair (RSA 4096 or ECC) via the settings panel.
-   **FR-002**: The system MUST require a user-defined passphrase to encrypt the generated private key before storing it locally.
-   **FR-003**: The system MUST publish the user's public key to a designated backend service, associating it with their Discord user ID.
-   **FR-004**: The system MUST use the user's Discord OIDC token to authorize the writing of their public key to the backend.
-   **FR-005**: The UI MUST provide a toggle in the chat input area to enable/disable "Secure Mode".
-   **FR-006**: The text input area's styling MUST change distinctively when "Secure Mode" is enabled.
-   **FR-007**: The system MUST intercept outgoing messages and, when in "Secure Mode", encrypt them for all intended recipients and the sender.
-   **FR-008**: The system MUST intercept incoming messages to detect PGP-formatted blocks.
-   **FR-009**: The system MUST, upon detecting a PGP block, attempt to decrypt it using the user's locally stored private key.
-   **FR-010**: The system MUST display successfully decrypted message content within a secure, visually distinct frame.
-   **FR-011**: The system MUST display a placeholder component for any PGP block that cannot be decrypted.
-   **FR-012**: The system MUST prompt the user for their passphrase to unlock the private key if it is not already in memory.
-   **FR-013**: When sending to multiple users (e.g., in a group chat), the system MUST encrypt the message individually only for recipients for whom a public key is available.
-   **FR-014**: The UI MUST provide a clear and unobtrusive indication to the sender, before the message is sent, which users in the channel will be able to decrypt the message.
-   **FR-015**: The system MUST allow the user to configure the private key passphrase caching duration via a setting in the plugin's settings panel.
-   **FR-016**: The passphrase caching options MUST include: caching per-session (until Discord is reloaded), time-based caching for a user-defined period of inactivity, and no caching (requiring a passphrase for every operation).

### Security & Privacy Requirements

*Based on the [pgpcord Constitution](/.specify/memory/constitution.md):*
-   **SPR-001** (**Security-First**): No unencrypted message content will be sent to Discord's API. Private keys are encrypted at rest on the client's machine and are never transmitted.
-   **SPR-002** (**User Trust**): The "Secure Mode" toggle and distinct UI provide an unambiguous signal about the encryption status. Decryption requires an explicit passphrase entry.
-   **SPR-003** (**Minimal Backend**): The backend's sole purpose is to store and serve public keys, keyed by Discord user ID. It has no role in message transmission or storage.
-   **SPR-004** (**Lifecycle Safety**): All message-intercepting patches and UI modifications must be cleanly removed when the plugin is unloaded.

### Key Entities *(include if feature involves data)*

-   **User Key Pair**: Represents a user's PGP identity. Attributes include a Public Key, an Encrypted Private Key, and a Key ID.
-   **Public Key Record**: Represents a user's public identity on the backend. Attributes include a Discord User ID and the corresponding Public Key.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: A new user can complete the entire key generation, passphrase setup, and public key publishing flow in under 90 seconds.
-   **SC-002**: The end-to-end latency for sending and rendering an encrypted message shall not exceed the latency of a standard message by more than 500 milliseconds.
-   **SC-003**: 100% of messages sent while "Secure Mode" is active are confirmed to be transmitted as valid PGP-encrypted blocks.
-   **SC-004**: The private key, when stored locally, must always be in an encrypted state, verifiable by inspecting the plugin's storage.

## Assumptions

-   The user is on a desktop version of Discord compatible with Vencord/Shelter.
-   The `openpgp.js` library is suitable and approved for use.
-   A Supabase instance is available and configured for this project's use.
-   Users understand the basic concept of a passphrase and the consequence of forgetting it (loss of access to encrypted messages).