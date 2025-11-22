# Implementation Plan: PGP Encryption for Discord (PGPCord)

**Branch**: `002-pgp-encryption-plugin` | **Date**: 2025-11-22 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/home/user/ghq/github.com/Zerostats/pgpcord/specs/002-pgp-encryption-plugin/spec.md`

## Summary

This plan outlines the implementation of PGPCord, a Shelter/Vencord plugin for end-to-end PGP encryption in Discord. The implementation will use SolidJS for the UI, `openpgp.js` for cryptography, and a Supabase backend for public key distribution, adhering strictly to the project's security-first constitution. The work is phased to build the core cryptographic functionality first, followed by backend integration and finally the chat UI patches.

## Technical Context

**Language/Version**: TypeScript (~5.x)
**Primary Dependencies**: `@uwu/lune`, `shelter.ui` (SolidJS), `openpgp`, `supabase-js`
**Storage**: Browser LocalStorage (for encrypted private keys), Supabase PostgreSQL (for public keys).
**Testing**: TBD - Likely Vitest/Jest for unit/integration tests.
**Target Platform**: Desktop Discord clients running Vencord or Shelter.
**Project Type**: Plugin for an existing application (`spikehd/shelter-plugins` monorepo).
**Performance Goals**: Add no more than 500ms of latency to message sending/rendering.
**Constraints**: Must operate within thesandboxed environment of a Shelter plugin, including its patching mechanism (`spitroast`) and lifecycle (`onLoad`/`onUnload`).
**Scale/Scope**: A single plugin composed of ~5-10 source files and one primary backend table.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [X] **Security-First**: The design uses `openpgp.js` for all cryptographic operations and mandates that private keys are encrypted with a user-provided passphrase before being stored locally. No unencrypted content is ever sent to any remote service.
- [X] **Architecture**: The proposed file structure and technology stack (Lune, SolidJS, SCSS) are in full compliance with the constitution.
- [X] **Minimal-Backend**: The backend's role is strictly limited to storing and serving public keys, authenticated via Discord's OIDC token. No message content is ever processed or stored by the backend.
- [X] **Lifecycle Safety**: The plan explicitly includes an `onUnload` function in the entry point (`index.tsx`) to handle the cleanup of all patches and UI components, preventing memory leaks and UI glitches.
- [X] **User Trust**: The design includes dedicated components (`SecureChatBar.tsx`, `EncryptedMessage.tsx`) to provide clear and unambiguous visual cues about the security status of conversations, preventing accidental data leakage.

**Result**: The plan is in full compliance with all constitutional principles.

## Project Structure

### Documentation (this feature)

```text
specs/002-pgp-encryption-plugin/
├── plan.md              # This file
├── research.md          # Phase 0: Research findings
├── data-model.md        # Phase 1: Data models and entity relationships
├── quickstart.md        # Phase 1: Developer setup and quickstart guide
├── contracts/           # Phase 1: Backend table definitions
│   └── supabase.md
└── tasks.md             # Phase 2: Generated task breakdown (not created by this command)
```

### Source Code (repository root)

```text
plugins/pgpcord/
├── index.tsx                   # Plugin entry point (onLoad, onUnload)
├── components/
│   ├── Settings.tsx            # UI for key generation, import/export, and settings
│   ├── SecureChatBar.tsx       # The "Secure Mode" toggle button and input area
│   └── EncryptedMessage.tsx    # Component for rendering decrypted message content
├── lib/
│   ├── crypto.ts               # Wrapper for openpgp.js functions (key gen, encrypt, decrypt)
│   └── api.ts                  # Supabase client logic (fetching/publishing public keys)
└── patches/
    ├── Message.ts              # Patches MessageContent to intercept and decrypt messages
    └── ChatBar.ts              # Patches ChannelTextArea to intercept and encrypt sent messages
```

**Structure Decision**: The proposed structure is a self-contained plugin directory (`plugins/pgpcord`), which aligns perfectly with the standards of a `shelter-plugins` monorepo and the project's constitution.

## Complexity Tracking

> No constitutional violations were identified. This section is not applicable.