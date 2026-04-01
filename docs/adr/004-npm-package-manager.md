# ADR 004: npm as Package Manager

## Status

Accepted

## Date

2026-01-08

## Context

The UXElle component library requires a package manager to handle dependencies and support a monorepo structure with multiple packages. The main options considered were npm, pnpm, yarn, and bun.

## Decision

We will use **npm** as our package manager.

## Rationale

While pnpm offers advantages in disk space efficiency and stricter dependency resolution, npm provides sufficient capabilities for our needs:

- **Familiarity**: The team has extensive experience with npm, reducing the learning curve and potential for configuration mistakes
- **Maturity**: npm 11+ has significantly improved install speeds and workspace support, narrowing the gap with alternatives
- **Simplicity**: No additional tooling or team training required
- **Ecosystem compatibility**: Universal support across CI/CD platforms, documentation, and tutorials

The benefits of pnpm (disk space savings, stricter hoisting) are more pronounced in larger monorepos with many packages. For our initial scope of 2-5 packages, npm workspaces are well-suited.

## Consequences

### Positive

- Zero learning curve for the team
- Straightforward setup and configuration
- Universal tooling support

### Negative

- Slightly higher disk usage compared to pnpm (packages duplicated across projects)
- Flat node_modules structure may allow accidental use of undeclared dependencies

### Neutral

- Migration to pnpm remains straightforward if scaling demands it in the future
