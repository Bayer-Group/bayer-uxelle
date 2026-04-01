import React from "react";
import type { Preview } from "@storybook/react-vite";

// Import Tailwind styles
import "../styles/globals.css";

// Theme CSS - load before components so variables exist (Vite glob does not load CSS)
import "../themes-loader";

// Import component library styles
import "@uxelle/components/styles.css";

// Theme registry exports theme metadata
import {
  themes,
  themeDataAttributes,
  themeToolbarItems,
} from "./theme-registry";
import {
  getAncillaryModesForTheme,
  ANCILLARY_TOOLBAR_ITEMS,
} from "./ancillary-registry";
import { globalJsxFilterPropsForDocs } from "../utils/storybookJsxFilterProps";

type ThemeId = (typeof themes)[number]["id"];
type ThemeMode = "light" | "dark";
type ColorSwitcherMode =
  | "neutral"
  | "neutral-alt"
  | "primary"
  | "secondary"
  | "tertiary"
  | "ancillary";

const COLOR_SWITCHER_MODES: { value: ColorSwitcherMode; title: string }[] = [
  { value: "neutral", title: "Neutral" },
  { value: "neutral-alt", title: "Neutral Alt" },
  { value: "primary", title: "Primary" },
  { value: "secondary", title: "Secondary" },
  { value: "tertiary", title: "Tertiary" },
  { value: "ancillary", title: "Ancillary" },
];

function applyTheme(
  theme: ThemeId,
  mode: ThemeMode,
  colorSwitcher: ColorSwitcherMode,
  ancillary: string
) {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const body = document.body;

  // Remove all theme data attributes from previous selection
  Object.values(themeDataAttributes).forEach((attr) =>
    root.removeAttribute(attr)
  );

  // Apply theme data attribute (light | dark) so theme CSS variables take effect
  const attrName = themeDataAttributes[theme];
  if (attrName) root.setAttribute(attrName, mode);

  // Apply data-breakpoints so --uxl-breakpoints-padding-* and typography variables resolve.
  root.setAttribute("data-breakpoints", "desktop");

  // Apply color switcher on root: theme defines component vars on root (via [data-velocity]) that reference --uxl-color-switcher-*; they must resolve on same element
  root.setAttribute("data-color-switcher", colorSwitcher);

  // Apply ancillary data attribute when color switcher is ancillary
  root.removeAttribute("data-ancillary");
  if (colorSwitcher === "ancillary") {
    const modes = getAncillaryModesForTheme(theme);
    const value = modes.includes(ancillary) ? ancillary : modes[0] ?? ancillary;
    if (value) root.setAttribute("data-ancillary", value);
  }

  // Sync preview background with theme mode (use setProperty for CSS variables)
  body.style.setProperty(
    "background-color",
    "var(--uxl-color-switcher-background)",
    "important"
  );
  body.style.setProperty(
    "color",
    "var(--uxl-color-switcher-text)",
    "important"
  );
  root.style.setProperty(
    "background-color",
    "var(--uxl-color-switcher-background)",
    "important"
  );
  root.style.setProperty(
    "color",
    "var(--uxl-color-switcher-text)",
    "important"
  );
}

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: "1rem" }}>{children}</div>;
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: themeToolbarItems,
        dynamicTitle: true,
      },
    },
    themeMode: {
      description: "Theme mode (light/dark)",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    colorSwitcher: {
      description: "Color switcher palette",
      toolbar: {
        title: "Color Switcher",
        icon: "contrast",
        items: COLOR_SWITCHER_MODES,
        dynamicTitle: true,
      },
    },
    ancillary: {
      description: "Ancillary mode (when Color Switcher is Ancillary and theme has multiple modes)",
      toolbar: {
        title: "Ancillary",
        icon: "component",
        items: ANCILLARY_TOOLBAR_ITEMS,
        dynamicTitle: true,
        // Hidden when no theme has more than one ancillary mode
        hidden: ANCILLARY_TOOLBAR_ITEMS.length < 2,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Story parameters override globals for Figma-accurate mode (theme, color switcher)
      const theme = (context.parameters.theme ??
        context.globals.theme ??
        themes[0]?.id ??
        "bayer-global") as ThemeId;
      const mode = (context.parameters.themeMode ??
        context.globals.themeMode ??
        "light") as ThemeMode;
      const colorSwitcher = (context.parameters.colorSwitcher ??
        context.globals.colorSwitcher ??
        "neutral") as ColorSwitcherMode;
      const ancillary = (context.parameters.ancillary ??
        context.globals.ancillary ??
        "100") as string;
      // Apply theme synchronously before render so CSS variables exist when Story paints
      applyTheme(theme, mode, colorSwitcher, ancillary);
      return (
        <ThemeWrapper>
          <Story />
        </ThemeWrapper>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    // Docs “Show code”: omit empty strings and inert false DOM props (Storybook default only drops undefined).
    jsx: {
      filterProps: globalJsxFilterPropsForDocs,
    },
  },
  initialGlobals: {
    theme: themes[0]?.id ?? "bayer-global",
    themeMode: "light",
    colorSwitcher: "neutral",
    ancillary: ANCILLARY_TOOLBAR_ITEMS[0]?.value ?? "100",
  },
};

export default preview;
