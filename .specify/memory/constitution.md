<!--
Sync Impact Report:
- Version change: 1.0.0 -> 2.0.0
- Modified principles:
  - Principle I: "Privacy-First" -> "Security-First" (redefined)
  - Principle II: "User-Trust" -> "User Trust" (redefined)
  - Principle III: "Zero-Trace" -> "Architecture" (replaced)
  - Principle IV: "Minimal-Backend" -> "Minimal Backend" (redefined)
- Added sections:
  - Principle V: Lifecycle Safety
- Templates requiring updates:
  - ⚠ .specify/templates/plan-template.md
  - ⚠ .specify/templates/spec-template.md
  - ⚠ .specify/templates/tasks-template.md
  - ⚠ README.md
- Follow-up TODOs: None
-->
# pgpcord Constitution

This constitution is the supreme governing document for the pgpcord project. All development, contributions, and decision-making must align with these principles.

## Core Principles

### I. Security-First
**Rule**: No unencrypted message content shall ever be transmitted to the Discord API or any backend service. Private keys MUST be stored exclusively on the user's local device and MUST be encrypted with a user-provided passphrase.
**Rationale**: The core purpose of the plugin is to provide end-to-end encryption. Compromising on this principle would render the project's primary goal void and betray user trust.

### II. Architecture
**Rule**: The plugin MUST be developed within the `plugins/pgpcord` directory of the Lune monorepo. It MUST be built using the `lune` toolchain. All user interface components MUST be implemented using `shelter.ui` (SolidJS), with styling applied via SCSS modules injected by `shelter.ui.injectCss`.
**Rationale**: Adhering to a strict, unified architecture ensures maintainability, simplifies the build process, and guarantees compatibility with the target Shelter/Vencord environment.

### III. Minimal Backend
**Rule**: The backend, hosted on Supabase, MUST be used exclusively for public key exchange and identity verification (OIDC). It MUST never store, process, or have access to any message content, encrypted or otherwise.
**Rationale**: Minimizing backend functionality reduces the attack surface and reinforces the zero-trust model. The backend's role is solely to facilitate secure connections, not to be a part of the communication channel.

### IV. Lifecycle Safety
**Rule**: The plugin's `onUnload` function MUST meticulously clean up all modifications to the environment. This includes, but is not limited to, removing all `spitroast` patches and disconnecting all DOM observers.
**Rationale**: Failure to clean up resources can lead to memory leaks, UI artifacts, and conflicts with other plugins or Discord's native functionality. Rigorous cleanup ensures stability and a seamless user experience.

### V. User Trust
**Rule**: The user interface MUST provide a clear, unambiguous, and persistent visual distinction between encrypted ("Secure Mode") and unencrypted states. The user must never be in doubt about the security status of their conversation.
**Rationale**: Accidental leakage of sensitive information is a critical failure state. The UI must be designed to prevent user error by making the current security context impossible to ignore.

## Governance

Amendments to this constitution require a pull request and approval from the project maintainers. Changes are versioned according to Semantic Versioning:
- **MAJOR**: Backward-incompatible changes, such as removing a principle.
- **MINOR**: Adding a new principle or a significant expansion of an existing one.
- **PATCH**: Clarifications, typo fixes, or other non-functional changes.

**Version**: 2.0.0 | **Ratified**: 2025-11-22 | **Last Amended**: 2025-11-22
