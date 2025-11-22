# Tasks: PGP Encryption for Discord (PGPCord)

**Input**: Design documents from `/specs/002-pgp-encryption-plugin/`
**Prerequisites**: plan.md, spec.md

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup & Foundational Tasks

**Purpose**: Project initialization and core infrastructure that MUST be complete before ANY user story can be implemented.

- [X] T001 Create the directory structure and empty files defined in `plan.md` inside `plugins/pgpcord/`.
- [X] T002 [P] Install required dependencies: `openpgp` and `supabase-js`.
- [X] T003 [P] Define shared TypeScript types for `UserKeyPair`, `PublicKeyRecord`, and `PluginSettings` in a new file `plugins/pgpcord/lib/types.ts`.
- [X] T004 Initialize the Supabase client in `plugins/pgpcord/lib/api.ts` using environment variables or placeholders for the URL and anon key.
- [X] T005 Set up the basic plugin entry point in `plugins/pgpcord/index.tsx`, including registering the settings component and defining empty `onLoad` and `onUnload` functions.

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 2: User Story 1 - Key Setup and Management (Priority: P1) 🎯 MVP

**Goal**: A user can generate a new PGP key pair, secure it with a passphrase, and publish their public key.
**Independent Test**: Verify in the settings UI that a key can be generated, is stored encrypted in LocalStorage, and the public key appears in the Supabase `user_keys` table.

- [X] T006 [US1] Implement the basic UI layout for the settings panel in `plugins/pgpcord/components/Settings.tsx`. Include placeholders for key display, a "Generate" button, and a passphrase input field.
- [X] T007 [P] [US1] Implement the `generateKeyPair` function in `plugins/pgpcord/lib/crypto.ts` using `openpgp.js` to create an RSA key pair.
- [X] T008 [P] [US1] Implement `encryptPrivateKey` and `decryptPrivateKey` functions in `plugins/pgpcord/lib/crypto.ts`.
- [X] T009 [US1] Implement `saveKeyPairToLocalStorage` and `loadKeyPairFromLocalStorage` utility functions that use Shelter's data API in `plugins/pgpcord/lib/crypto.ts`. This depends on T008.
- [X] T010 [P] [US1] Implement `getDiscordOidcToken` and `publishPublicKey` functions in `plugins/pgpcord/lib/api.ts` to handle Supabase authentication and data insertion.
- [X] T011 [US1] Integrate the key generation and storage logic (T007-T010) into `plugins/pgpcord/components/Settings.tsx`, connecting them to the UI elements.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently via the settings panel.

---

## Phase 3: User Story 4 - Configuring Passphrase Caching (Priority: P3)

**Goal**: A user can configure the passphrase caching strategy to balance security and convenience.
**Independent Test**: Change the caching setting to 'none', then decrypt a message. Decrypt another message and verify the passphrase is required again.

- [X] T012 [US4] Add UI elements (e.g., a dropdown and number input) for configuring the caching strategy to `plugins/pgpcord/components/Settings.tsx`.
- [X] T013 [US4] Implement state management for the caching settings, saving the user's choice to Shelter's data store.
- [X] T014 [US4] Modify the `decryptPrivateKey` function and introduce a caching mechanism in `plugins/pgpcord/lib/crypto.ts` that respects the user's selected caching strategy.

**Checkpoint**: Passphrase caching is now configurable and functional.

---

## Phase 4: User Story 2 - Sending & Receiving Encrypted Messages (Priority: P1)

**Goal**: A user can toggle a "Secure Mode" to send and receive PGP-encrypted messages within a chat.
**Independent Test**: With two test users who have completed US1, have User A send an encrypted message and verify User B can decrypt and read it.

- [X] T015 [P] [US2] Implement the `SecureChatBar.tsx` component, including the lock icon toggle button and logic to change style based on its state.
- [X] T016 [P] [US2] Implement the `EncryptedMessage.tsx` component to display decrypted content within a styled frame.
- [X] T017 [US2] Implement the `encryptMessage` function in `plugins/pgpcord/lib/crypto.ts`. This will require fetching recipient public keys via a new function in `lib/api.ts`.
- [X] T018 [US2] Create the chat interception patch in `plugins/pgpcord/patches/ChatBar.ts`. Use `spitroast` to patch `ChannelTextArea` to inject `SecureChatBar.tsx` and call `encryptMessage` (T017) on message send when secure mode is active.
- [X] T019 [US2] Implement the `decryptMessage` function in `plugins/pgpcord/lib/crypto.ts`.
- [X] T020 [US2] Create the message interception patch in `plugins/pgpcord/patches/Message.ts`. Use `spitroast` to patch `MessageContent` to detect PGP blocks and call `decryptMessage` (T019).
- [X] T021 [US2] Integrate the `EncryptedMessage.tsx` component (T016) into the `Message.ts` patch (T020) to render the decrypted content.
- [X] T022 [US2] Add the patches from `ChatBar.ts` and `Message.ts` to the `onLoad` function in `plugins/pgpcord/index.tsx`.

**Checkpoint**: Core chat functionality is complete. Users can encrypt and decrypt messages.

---

## Phase 5: User Story 3 - Handling Inaccessible Encrypted Messages (Priority: P2)

**Goal**: Show a clear placeholder for encrypted messages that cannot be decrypted by the current user.
**Independent Test**: Send an encrypted message into a channel. View that channel with a user who has not set up PGPCord and verify they see the placeholder.

- [X] T023 [US3] Modify the `EncryptedMessage.tsx` component to accept a "state" prop (e.g., 'decrypted' | 'placeholder').
- [X] T024 [US3] Update the `Message.ts` patch (T020) to render `EncryptedMessage.tsx` in its 'placeholder' state when a PGP block is detected but decryption fails or is not possible.

**Checkpoint**: The plugin now handles encrypted messages gracefully for all users.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and ready the feature for release.

- [X] T025 [P] Implement UI feedback for loading states (e.g., spinners or messages) in `Settings.tsx` and `EncryptedMessage.tsx` while performing async operations.
- [X] T026 [P] Implement robust error handling throughout the plugin (e.g., for API failures, cryptographic errors, missing keys). Display user-friendly error messages.
- [X] T027 Finalize the `onUnload` function in `plugins/pgpcord/index.tsx` to ensure all patches, UI elements, and listeners are properly removed.
- [X] T028 Review all code for clarity, add comments for complex logic, and ensure adherence to the project's coding standards.
- [X] T029 Perform a full manual test of all user stories using the `quickstart.md` as a guide.

---

## Dependencies & Execution Order

- **Phase 1 (Setup)** must be completed before any other phase.
- **Phase 2 (US1)** and **Phase 3 (US4)** are highly related and should be completed before starting chat integration. They form the "settings" MVP.
- **Phase 4 (US2)** depends on the completion of Phase 1. It is the core chat functionality.
- **Phase 5 (US3)** depends on Phase 4.
- **Phase 6 (Polish)** should be performed last.

**Suggested MVP Scope**: Complete Phase 1 and Phase 2. This delivers the core value of being able to create and manage PGP keys.
