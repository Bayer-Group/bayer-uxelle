# @uxelle/storybook

Storybook app for developing and documenting [UXElle](../../README.md) components.

## Getting Started

From the **monorepo root**:

```bash
npm install   # install all workspace dependencies
npm run dev   # starts Storybook on http://localhost:6006
```

Or from this directory:

```bash
npx storybook dev -p 6006
```

## Scripts

| Script | Description |
| ------ | ----------- |
| `dev` | Start Storybook dev server on port 6006 |
| `build` | Build a static Storybook site to `storybook-static/` |
| `clean` | Remove the `storybook-static/` output directory |

## Project Layout

```
.storybook/       # Storybook configuration (main, preview, theme registry)
stories/          # Component stories (*.stories.tsx, *.mdx)
styles/           # Global stylesheets loaded by Storybook
utils/            # Shared story utilities
```

## Adding a Story

Create a file in `stories/` following the naming convention `<ComponentName>.stories.tsx`. Storybook automatically picks up any `*.stories.tsx` or `*.mdx` file in that directory.

## Theming

Themes live in the top-level `themes/` directory and are aliased as `@themes` in the Vite config, so stories can import theme CSS directly.
