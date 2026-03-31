# UXElle (Work in Progress)

`@uxelle/components` — A React component library and design system.

## Getting Started

```bash
npm install

# Build the package (ESM + CJS + types + CSS)
npm run build

# Watch mode for development
npm run dev
```

## Usage

```tsx
import { Button, Typography } from "@uxelle/components";
import "@uxelle/components/styles.css";
```

## Components

Accordion, AccordionGroup, Button, Divider, Footer, HelperText, Icon, IconButton, Label, LanguageSelector, LanguageSelectorButton, Layout, Link, List, ListColumns, ListItem, Menu, NavButton, Navigation, Switch, Textfield, Typography

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Build with tsup (ESM, CJS, declarations, CSS) |
| `npm run dev` | Watch mode via tsup |
| `npm run clean` | Remove `dist/` |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run lint:eslint` | Lint source with ESLint |
| `npm run lint:eslint:fix` | Lint and auto-fix |
| `npm run format` | Format source with Prettier |
| `npm run format:check` | Check formatting |

## Tech Stack

- **React** 18 / 19 (peer dependency)
- **TypeScript** (strict)
- **tsup** (esbuild) for bundling
- **Plain CSS** per component + Material Symbols icons
- **ESLint 9** + **Prettier** for linting and formatting
- **PostCSS** with autoprefixer
