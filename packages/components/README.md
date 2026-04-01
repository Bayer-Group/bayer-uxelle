# @uxelle/components

Core React component library for the UXElle design system. Ships ESM, CJS, TypeScript declarations, and a bundled CSS stylesheet.

> Part of the [UXElle monorepo](../../README.md). See the root README for workspace setup.

## Installation (coming soon)

```bash
#npm install @uxelle/components
```

Peer dependencies: `react` and `react-dom` (18 or 19).

## Usage

Import components and the stylesheet:

```tsx
import { Button, Typography, Icon } from "@uxelle/components";
import "@uxelle/components/styles.css";
```

The stylesheet includes a CSS reset/baseline and all component styles. Theme tokens (colors, spacing, typography scales) are provided separately via CSS custom properties — see the `themes/` directory in the monorepo root.

## Components

| Category | Components |
| --- | --- |
| **Actions** | Button, IconButton, Link, NavButton, Switch |
| **Content** | Typography, Icon, Divider, Label, HelperText |
| **Data** | List, ListItem, ListColumns, Accordion, AccordionGroup |
| **Navigation** | Navigation, Menu, LanguageSelector, LanguageSelectorButton |
| **Layout** | Layout, Footer |
| **Form** | Textfield |

Each component exports its React component, a `*_DEFAULTS` constant, a `*_PROP_CONTROLS` descriptor (used by Storybook), and relevant TypeScript types.

## Development

From the monorepo root:

```bash
npm run dev    # starts components watch + Storybook
```

Or run package-level scripts directly:

| Script | Description |
| --- | --- |
| `build` | Build with tsup (ESM, CJS, declarations, CSS) |
| `dev` | Watch mode via tsup |
| `clean` | Remove `dist/` |
| `lint` | Type-check with `tsc --noEmit` |
| `lint:eslint` | Lint with ESLint |
| `lint:eslint:fix` | Lint and auto-fix |
| `format` | Format with Prettier |
| `format:check` | Check formatting |

## Architecture

- **One directory per component** (`src/Button/`, `src/Icon/`, etc.), each with a `.tsx`, `.css`, and barrel `index.ts`
- **Plain CSS** scoped per component — no CSS-in-JS runtime
- **Material Symbols** for the icon set
- **tsup** (esbuild) bundles everything; output is marked `"use client"` for RSC compatibility
- **PostCSS** with autoprefixer for vendor prefixes
