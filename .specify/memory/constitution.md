<!--
Sync Impact Report:
- Version change: none -> 1.0.0
- Added sections:
  - Core Principles
  - Security Requirements
  - Development Workflow
  - Governance
- Templates requiring updates:
  - ⚠ .specify/templates/plan-template.md
  - ⚠ .specify/templates/spec-template.md
  - ⚠ .specify/templates/tasks-template.md
  - ⚠ README.md
- Follow-up TODOs: None
-->
# pgpcord Constitution

## Core Principles

### I. Privacy-First
No unencrypted data ever leaves the client. All data must be encrypted at rest and in transit.

### II. User-Trust
All key operations must be explicit and user-confirmed. The user must be in control of their keys and data.

### III. Zero-Trace
Local storage must be encrypted. No plaintext logging of sensitive information.

### IV. Minimal-Backend
The backend is for key exchange only, never for message content. The backend should be as simple as possible.

## Security Requirements

All cryptographic operations must use well-vetted, standard libraries. No custom crypto. Dependencies will be regularly audited for vulnerabilities.

## Development Workflow

All changes must be submitted as pull requests and reviewed by at least one other person. All code must pass automated testing, including linting and security analysis, before being merged.

## Governance

This constitution is the supreme governing document for this project. All development and contributions must align with these principles. Amendments to this constitution require a pull request and approval from the project maintainers.

**Version**: 1.0.0 | **Ratified**: 2025-11-22 | **Last Amended**: 2025-11-22