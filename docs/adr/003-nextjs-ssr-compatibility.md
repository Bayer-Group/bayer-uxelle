# ADR 003: Next.js and SSR Compatibility

## Status

Accepted

## Date

2025-12-17

## Context

UXElle is a React component library that will be consumed by various applications. Many modern React applications are built with Next.js or other frameworks that utilize server-side rendering (SSR), static site generation (SSG), or React Server Components (RSC).

Components that assume browser-only execution can break in SSR environments, causing hydration mismatches, build failures, or runtime errors. This limits where the library can be used and creates friction for adopters.

## Decision

UXElle will be designed and tested for compatibility with Next.js and server-side rendering environments.

## Rationale

- **Broad adoption**: Next.js is the most popular React framework for production applications. SSR compatibility ensures UXElle can be used in the majority of React projects without workarounds
- **Future-proofing**: React's direction increasingly emphasizes server components and streaming SSR. Building with SSR compatibility from the start avoids costly refactoring later
- **Developer experience**: Users shouldn't need to wrap components in dynamic imports or add `"use client"` directives just to avoid SSR issues—the library should handle this gracefully
- **SEO and performance**: SSR-compatible components allow applications to render meaningful content on the server, improving initial load performance and search engine indexing

## Implementation Guidelines

To maintain SSR compatibility, UXElle components must:

1. **Avoid direct browser API access at module scope**: Do not reference `window`, `document`, `localStorage`, or other browser-only APIs at the top level of modules
2. **Guard browser APIs in effects**: Access browser APIs only within `useEffect` or event handlers, which run exclusively on the client
3. **Handle missing APIs gracefully**: When browser APIs are necessary, check for their existence before use
4. **Avoid layout-dependent initial state**: Do not initialize state based on `window.innerWidth` or similar values that differ between server and client
5. **Mark client-only components explicitly**: Components that fundamentally require the browser should be clearly documented and export a `"use client"` directive where appropriate
6. **Test in SSR environments**: Include Next.js integration tests to catch SSR issues before release

## Consequences

### Positive

- UXElle works seamlessly in Next.js, Remix, Gatsby, and other SSR frameworks
- No special configuration or workarounds required for SSR users
- Components are more robust and predictable across environments
- Enables use in performance-critical and SEO-sensitive applications

### Negative

- Additional development constraints when implementing components
- Some purely client-side features may require extra patterns (effects, lazy loading)
- Testing requirements increase to cover both client and server rendering

### Neutral

- Components that inherently require browser APIs (e.g., clipboard, geolocation) will be documented as client-only and marked accordingly

