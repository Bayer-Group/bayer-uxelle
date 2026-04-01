import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon";
import type { MaterialSymbolIconName } from "../Icon";

export type IconButtonEmphasis = "high" | "medium" | "low";
export type IconButtonSize = "small" | "medium" | "large";

/** Maps emphasis to CSS class suffix (high=filled, medium=outline, low=text) */
const EMPHASIS_TO_CLASS: Record<IconButtonEmphasis, string> = {
  high: "filled",
  medium: "outline",
  low: "text",
};

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis: high (filled), medium (outline), or low (text only). */
  emphasis?: IconButtonEmphasis;
  /** Size of the icon button */
  size?: IconButtonSize;
  /** Material Symbol name for the icon */
  iconName?: MaterialSymbolIconName;
  /** Icon variant (sharpFilled or sharpUnfilled / outlined) */
  iconVariant?: "sharpFilled" | "sharpUnfilled";
  /** Accessible label (required for icon-only buttons) */
  "aria-label"?: string;
}

/** Default prop values */
export const ICON_BUTTON_DEFAULTS = {
  emphasis: "high" as const,
  size: "medium" as const,
  iconName: "add" as MaterialSymbolIconName,
  iconVariant: "sharpUnfilled" as const,
} as const;

export const ICON_BUTTON_PROP_CONTROLS = {
  emphasis: {
    type: "select" as const,
    description:
      "Visual emphasis: high (filled), medium (outline), low (text only).",
    options: [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ],
    defaultValue: ICON_BUTTON_DEFAULTS.emphasis,
  },
  size: {
    type: "select" as const,
    description: "Size of the icon button",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
    defaultValue: ICON_BUTTON_DEFAULTS.size,
  },
  iconName: {
    type: "text" as const,
    description: "Material Symbol name for the icon",
    defaultValue: ICON_BUTTON_DEFAULTS.iconName,
  },
  iconVariant: {
    type: "select" as const,
    description: "Icon variant (sharpFilled or sharpUnfilled / outlined)",
    options: [
      { value: "sharpUnfilled", label: "sharpUnfilled" },
      { value: "sharpFilled", label: "sharpFilled" },
    ],
    defaultValue: ICON_BUTTON_DEFAULTS.iconVariant,
  },
  disabled: {
    type: "boolean" as const,
    description: "Whether the button is disabled",
    defaultValue: false,
  },
  "aria-label": {
    type: "text" as const,
    description: "Accessible label (required for icon-only buttons)",
    placeholder: "e.g. Add item",
    defaultValue: "",
  },
} as const;

/**
 * Icon-only button component for user interactions.
 *
 * - **WCAG AA compliant**: Contrast ratios meet 4.5:1 for icon
 * - **Browser-based focus ring**: Uses native outline on :focus-visible (keyboard only)
 * - **Keyboard operable**: Native <button> supports Enter and Space
 * - **ARIA**: aria-label required for icon-only buttons (no visible text)
 *
 * @example
 * ```tsx
 * <IconButton iconName="add" aria-label="Add item" />
 * <IconButton emphasis="medium" iconName="close" aria-label="Close" />
 * <IconButton emphasis="low" iconName="settings" aria-label="Settings" />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      emphasis = ICON_BUTTON_DEFAULTS.emphasis,
      size = ICON_BUTTON_DEFAULTS.size,
      iconName = ICON_BUTTON_DEFAULTS.iconName,
      iconVariant = ICON_BUTTON_DEFAULTS.iconVariant,
      disabled,
      className = "",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const emphasisClass = EMPHASIS_TO_CLASS[emphasis];
    const classNames = [
      "uxl-icon-button",
      `uxl-icon-button--${emphasisClass}`,
      `uxl-icon-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        disabled={disabled}
        aria-label={ariaLabel}
        {...props}
      >
        <span className="uxl-icon-button__icon" aria-hidden>
          <Icon iconName={iconName} variant={iconVariant} />
        </span>
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
