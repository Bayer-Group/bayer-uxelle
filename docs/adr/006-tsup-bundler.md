# ADR 006: tsup as Library Bundler

## Status

Accepted

## Date

2026-01-08

## Context

The UXElle component library needs a build tool to bundle TypeScript React components for distribution. The library must output both ESM and CommonJS formats with TypeScript declarations. Options considered included tsup, Rollup, and Vite library mode.

## Decision

We will use **tsup** as our library bundler.

## Rationale

tsup is purpose-built for building TypeScript libraries and offers significant advantages over our previous Rollup setup:

- **Minimal configuration**: What required 100+ lines of Rollup config with multiple plugins is ~10-20 lines with tsup
- **Fast builds**: Built on esbuild, tsup is significantly faster than Rollup
- **Batteries included**: TypeScript declarations, multiple output formats, and code splitting work out of the box
- **Maintained and focused**: Unlike Vite (which treats library mode as secondary to app building), tsup is specifically designed for this use case

Compared to Vite library mode:
- Vite uses Rollup under the hood, so we'd still be writing Rollup-style configuration
- Vite's dev server is redundant since we use Storybook for component development
- tsup's API is more intuitive for library-specific needs

## Consequences

### Positive

- Dramatically simpler build configuration compared to Rollup
- Faster build times
- Less maintenance burden (fewer plugins to manage and update)
- Clear, library-focused documentation

### Negative

- Less flexibility than raw Rollup for highly custom build pipelines
- Team needs to learn tsup's configuration API (though it's minimal)

### Neutral

- Complex multi-stage builds can still be achieved through multiple tsup configs or npm script orchestration
