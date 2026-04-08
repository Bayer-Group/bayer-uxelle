<div align="center">

# UXElle

**A React component library and design system for Bayer**

[![License: MIT](https://img.shields.io/badge/License-MIT-009fe3.svg)](LICENSE)
[![Node](https://img.shields.io/badge/Node-%E2%89%A522-10a962.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg)](https://react.dev)
[![Early Preview](https://img.shields.io/badge/Status-Early%20Preview-ff6900.svg)](#overview)

<picture>
  <img alt="UXElle Storybook documentation: example layout with typography, buttons, and component previews" src=".github/images/example-screenshot.png" width="720" />
</picture>

</div>

## Overview

UXElle provides production-ready React components styled with design tokens from Bayer's design language. Components ship as ESM and CJS with TypeScript declarations and a bundled CSS stylesheet — no CSS-in-JS runtime required.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Usage](#usage)
- [Components](#components)
- [Themes](#themes)
- [Project Structure](#project-structure)
- [Development](#development)
- [Architecture Decisions](#architecture-decisions)
- [Contributing](#contributing)
- [License](#license)

### Highlights

- **22 components** across Actions, Content, Data, Navigation, Layout, and Form categories
- **Multi-theme support** with CSS custom properties (Green / Velocity) including light and dark modes
- **RSC compatible** — all outputs are marked `"use client"` for Next.js App Router compatibility
- **Figma connected** — components sync with Figma via Code Connect
- **Zero runtime overhead** — plain CSS scoped per component, processed with PostCSS + Autoprefixer
- **Material Symbols** icon set built in

## Quick Start

```bash
# Clone and install
git clone https://github.com/Bayer-Group/bayer-uxelle.git && cd bayer-uxelle
npm install

# Start Storybook for development
npm run dev

# Build all packages
npm run build
```

## Usage

```tsx
import { Button, Typography, Icon } from "@uxelle/components";
import "@uxelle/components/styles.css";

function App() {
  return (
    <Button variant="primary" size="md">
      Get Started
    </Button>
  );
}
```

Theme tokens (colors, spacing, typography scales) are provided separately via CSS custom properties — see the [`themes/`](themes/) directory.

## Components

| Category | Components |
| :--- | :--- |
| **Actions** | `Button` &middot; `IconButton` &middot; `Link` &middot; `NavButton` &middot; `Switch` |
| **Content** | `Typography` &middot; `Icon` &middot; `Divider` &middot; `Label` &middot; `HelperText` |
| **Data** | `List` &middot; `ListItem` &middot; `ListColumns` &middot; `Accordion` &middot; `AccordionGroup` |
| **Navigation** | `Navigation` &middot; `Menu` &middot; `LanguageSelector` &middot; `LanguageSelectorButton` |
| **Layout** | `Layout` &middot; `Footer` |
| **Form** | `Textfield` |

<details>
<summary><strong>AccordionGroup preview</strong></summary>
<br />
<img alt="Storybook preview of AccordionGroup: stacked expandable panels with titles, chevrons, and body content" src=".github/images/accordion-screenshot.png" width="720" />
</details>

## Themes

UXElle ships with two theme packages, each supporting light and dark modes:

<div align="center">

<picture>
  <img alt="Abstract side-by-side preview of Green (Crop Science) and Velocity light themes: neutral background, primary surface strip, and default button swatches with data attribute hints" src=".github/images/themes-preview.svg" width="720" />
</picture>

</div>

| Theme | CSS File | Brand |
| :--- | :--- | :--- |
| **Green** | `themes/green/green.css` | Bayer Crop Science |
| **Velocity** | `themes/velocity/velocity.css` | Velocity |

Themes are applied via `data-*` attributes on a parent element, enabling scoped theming, color switching, decorative palettes, and responsive breakpoint tokens.

## Project Structure

```text
bayer-uxelle/
├── packages/
│   └── components/       @uxelle/components — core React library
├── apps/
│   └── storybook/        @uxelle/storybook — dev & documentation
├── themes/               Design token CSS outputs + manifest
├── docs/
│   └── adr/              Architecture Decision Records
└── package.json          Monorepo root (npm workspaces)
```

## Development

This is a monorepo managed with **npm workspaces**. Key scripts from the root:

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start components in watch mode + Storybook |
| `npm run build` | Build all packages |
| `npm run lint` | Type-check all packages |
| `npm run lint:eslint` | Lint with ESLint |
| `npm run format` | Format with Prettier |
| `npm run clean` | Remove all `dist/` directories |

### Requirements

- **Node.js** >= 22
- **npm** (ships with Node)

## Architecture Decisions

Key technical choices are documented as ADRs in [`docs/adr/`](docs/adr/):

| ADR | Decision |
| :--- | :--- |
| [001](docs/adr/001-react-frontend-framework.md) | React as the frontend framework |
| [002](docs/adr/002-tailwind-css-styling.md) | Tailwind CSS for styling |
| [003](docs/adr/003-nextjs-ssr-compatibility.md) | Next.js SSR compatibility |
| [004](docs/adr/004-npm-package-manager.md) | npm as the package manager |
| [005](docs/adr/005-npm-workspaces-monorepo.md) | npm workspaces for the monorepo |
| [006](docs/adr/006-tsup-bundler.md) | tsup as the bundler |

## Contributing

We welcome contributions! Please read our [Contribution Guidelines](CONTRIBUTING.md) before submitting a pull request.

<div align="center">

## License

[MIT](LICENSE) &copy; 2026 Bayer AG

</div>
