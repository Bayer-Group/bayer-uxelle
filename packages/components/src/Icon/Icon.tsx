import React from "react";
import { isDevelopment } from "../utils/env";

export type MaterialSymbolIconName = string;

// Default values for Icon component
export const ICON_DEFAULTS = {
  iconName: "add" as MaterialSymbolIconName,
  size: 24,
  variant: "sharpUnfilled" as const,
} as const;

// Size constraints for Icon component
export const ICON_SIZE_CONSTRAINTS = {
  min: 8,
  max: 128,
  step: 1,
} as const;

// Control configuration for each prop (used for auto-generated playgrounds)
// Descriptions match JSDoc comments in IconProps interface
export const ICON_PROP_CONTROLS = {
  iconName: {
    type: "autocomplete" as const,
    description: "The name of the Material Symbol icon to display",
    placeholder:
      "Search for a Material Symbol icon (e.g., 'add', 'home', 'settings')...",
    defaultValue: ICON_DEFAULTS.iconName,
  },
  size: {
    type: "number" as const,
    description: "Size of the icon in pixels",
    min: ICON_SIZE_CONSTRAINTS.min,
    max: ICON_SIZE_CONSTRAINTS.max,
    step: ICON_SIZE_CONSTRAINTS.step,
    defaultValue: ICON_DEFAULTS.size,
  },
  variant: {
    type: "select" as const,
    description: "Icon variant: 'sharpFilled' or 'sharpUnfilled'",
    options: [
      { value: "sharpUnfilled", label: "sharpUnfilled" },
      { value: "sharpFilled", label: "sharpFilled" },
    ],
    defaultValue: ICON_DEFAULTS.variant,
  },
  "aria-label": {
    type: "textarea" as const,
    description: "ARIA label for accessibility",
    placeholder: "Optional ARIA label for accessibility",
    rows: 2,
    fullWidth: true,
    defaultValue: "",
  },
  "aria-hidden": {
    type: "select" as const,
    description:
      "When true, hides the element from screen readers (for decorative icons)",
    options: [
      { value: "auto", label: "Auto (default: true if no label)" },
      { value: "true", label: "True" },
      { value: "false", label: "False" },
    ],
    transform: (value: string) => {
      if (value === "auto") return undefined;
      return value === "true";
    },
    transformBack: (value: boolean | undefined) => {
      if (value === undefined) return "auto";
      return value ? "true" : "false";
    },
    defaultValue: undefined,
  },
  role: {
    type: "text" as const,
    description: "ARIA role attribute",
    placeholder: "Optional ARIA role (e.g., 'button', 'img')",
    fullWidth: true,
    defaultValue: "",
  },
} as const;

export interface IconProps {
  /**
   * The name of the Material Symbol icon to display
   * @default "add"
   */
  iconName?: MaterialSymbolIconName;
  /**
   * Size of the icon in pixels
   * @default 24
   */
  size?: number;
  /**
   * Optional inline styles
   */
  style?: React.CSSProperties;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
  /**
   * When true, hides the element from screen readers (for decorative icons)
   */
  "aria-hidden"?: boolean;
  /**
   * ARIA role attribute
   */
  role?: string;
  /**
   * Icon variant: 'sharpFilled' or 'sharpUnfilled'
   * @default "sharpUnfilled"
   */
  variant?: "sharpFilled" | "sharpUnfilled";
}

/**
 * Renders Material Symbols icons.
 *
 * @example
 * // Decorative icon (default - hidden from screen readers)
 * <Icon iconName="home" size={24} />
 *
 * @example
 * // Meaningful icon with accessible name
 * <Icon iconName="close" aria-label="Close dialog" size={24} />
 *
 * @example
 * // Icon with custom role
 * <Icon iconName="settings" role="img" aria-label="Settings" size={32} />
 */
export const Icon: React.FC<IconProps> = ({
  iconName = ICON_DEFAULTS.iconName,
  size = ICON_DEFAULTS.size,
  style: externalStyle,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
  role,
  variant = ICON_DEFAULTS.variant,
}) => {
  // Prop validation in development
  if (isDevelopment) {
    if (
      size !== undefined &&
      (size < ICON_SIZE_CONSTRAINTS.min || size > ICON_SIZE_CONSTRAINTS.max)
    ) {
      console.warn(
        `Icon: size prop (${size}) is outside valid range [${ICON_SIZE_CONSTRAINTS.min}, ${ICON_SIZE_CONSTRAINTS.max}]. ` +
          `Using value as-is, but it may not render correctly.`
      );
    }
    if (
      variant &&
      variant !== "sharpFilled" &&
      variant !== "sharpUnfilled"
    ) {
      console.warn(
        `Icon: Invalid variant "${variant}". Valid options are "sharpFilled" or "sharpUnfilled". ` +
          `Using default "${ICON_DEFAULTS.variant}".`
      );
    }
  }

  // Build ARIA attributes object
  const ariaProps: {
    role?: string;
    "aria-label"?: string;
    "aria-hidden"?: boolean;
  } = {};

  if (role) ariaProps.role = role;
  if (ariaLabel) ariaProps["aria-label"] = ariaLabel;
  if (ariaHidden !== undefined) ariaProps["aria-hidden"] = ariaHidden;

  // If no aria-label and not explicitly hidden, hide from screen readers by default
  // (icons are often decorative)
  if (!ariaLabel && ariaHidden === undefined) {
    ariaProps["aria-hidden"] = true;
  }

  // Build className with variant class
  const className = [
    "material-symbols-sharp",
    "icon-component",
    variant === "sharpFilled" ? "icon-filled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  // Build style object - size, external styles, and filled variant (inline so it overrides any CSS)
  const style: React.CSSProperties = {
    ...(size !== ICON_DEFAULTS.size ? { fontSize: `${size}px` } : {}),
    ...externalStyle,
    ...(variant === "sharpFilled"
      ? { fontVariationSettings: `"FILL" 1, "wght" 400, "GRAD" 0, "opsz" ${size}` }
      : {}),
  };

  return (
    <span
      className={className}
      style={Object.keys(style).length > 0 ? style : undefined}
      {...ariaProps}
    >
      {iconName}
    </span>
  );
};

/**
 * Icon component using Material Symbols font.
 *
 * Renders icons using the material-symbols font package (sharp variant only).
 * Updates instantly when the iconName changes.
 *
 * By default, icons are hidden from screen readers (aria-hidden="true") as they are
 * typically decorative. Provide an aria-label when the icon conveys meaningful information.
 *
 * @component
 * @see {@link IconProps} for available props
 *
 * @example
 * // Decorative icon (default - hidden from screen readers)
 * <Icon iconName="home" size={24} />
 *
 * @example
 * // Meaningful icon with accessible name
 * <Icon iconName="close" aria-label="Close dialog" size={24} />
 */
export default Icon;