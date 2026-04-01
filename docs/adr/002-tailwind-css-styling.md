# ADR 002: Tailwind CSS for Styling

## Status

Accepted

## Date

2025-12-17

## Context

UXElle needs a styling approach for building its user interface. The choice affects development speed, design flexibility, and how easily the application can be customized or extended.

We considered several approaches:

- **Full UI libraries** (Material UI, Chakra UI, Ant Design): Provide pre-built components with opinionated design systems
- **CSS-in-JS** (Styled Components, Emotion): Scoped styles with JavaScript integration
- **Utility-first CSS** (Tailwind CSS): Low-level utility classes for building custom designs
- **Traditional CSS/Sass**: Manual stylesheets with preprocessor features

## Decision

We will use **Tailwind CSS** as our primary styling solution.

## Rationale

Tailwind CSS offers a powerful utility-first approach that strikes the right balance between speed and flexibility:

- **Less opinionated than UI libraries**: Full UI libraries like Material UI or Chakra enforce specific design languages. Tailwind provides the building blocks without dictating how components should look, giving us freedom to create a distinctive visual identity
- **Avoids component lock-in**: UI libraries couple your code to their component APIs. Switching or customizing deeply becomes difficult. Tailwind styles are just classes—easy to change, override, or migrate
- **Powerful utility system**: Comprehensive utilities for layout, spacing, typography, colors, and responsive design eliminate most needs for custom CSS while maintaining full control
- **Design consistency without rigidity**: Tailwind's design tokens (spacing scale, color palette, etc.) encourage consistency while remaining fully customizable through configuration
- **Performance**: Unused utilities are automatically purged in production, resulting in minimal CSS footprint

## Consequences

### Positive

- Full control over visual design without fighting a component library's opinions
- Rapid iteration using utility classes directly in markup
- Consistent spacing, colors, and typography through Tailwind's design system
- Easy to customize or rebrand without architectural changes
- Small production bundle sizes

### Negative

- No pre-built complex components (modals, dropdowns, etc.)—we build or source these separately
- Utility classes can make markup verbose
- Requires familiarity with Tailwind's class naming conventions

### Neutral

- We may adopt headless UI libraries (Radix, Headless UI) for complex interactive components while styling them with Tailwind
