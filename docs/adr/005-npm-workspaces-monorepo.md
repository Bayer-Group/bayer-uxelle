# ADR 005: npm Workspaces for Monorepo Management

## Status

Accepted

## Date

2026-01-08

## Context

The UXElle design system will consist of multiple packages: a core component library initially, with utility packages planned for the future. A monorepo structure allows these packages to be developed, tested, and versioned together. Options considered included npm workspaces alone, npm workspaces with Turborepo, and Nx.

## Decision

We will use **npm workspaces** without additional monorepo tooling (no Turborepo or Nx).

## Rationale

npm workspaces provide the essential monorepo capabilities we need:

- **Workspace linking**: Packages can depend on each other using the `workspace:*` protocol
- **Unified dependency management**: A single `npm install` at the root installs dependencies for all packages
- **Script orchestration**: Root-level scripts can run commands across all packages

Additional tooling like Turborepo adds value through build caching and smarter task scheduling, but introduces complexity. For our current scale:

- Build times are expected to be short (< 30 seconds)
- The number of packages is small (2-5 initially)
- CI caching can be handled at the CI platform level if needed

Starting simple allows us to add Turborepo later if build performance becomes a concern, without architectural changes.

## Consequences

### Positive

- Minimal configuration and tooling to understand
- No additional dependencies or learning curve
- Straightforward debugging when workspace issues arise

### Negative

- No built-in build caching (full rebuilds each time)
- Less sophisticated task orchestration for parallel builds

### Neutral

- Turborepo can be added incrementally if needed—the workspace structure remains compatible
