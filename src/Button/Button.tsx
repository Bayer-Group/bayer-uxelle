import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon";
import type { MaterialSymbolIconName } from "../Icon";

export type ButtonEmphasis = "high" | "medium" | "low";
export type ButtonSize = "small" | "medium" | "large";

/** Maps Figma Emphasis to CSS class suffix (high=filled, medium=outline, low=text) */
const EMPHASIS_TO_CLASS: Record<ButtonEmphasis, string> = {
  high: "filled",
  medium: "outline",
  low: "text",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis: high (filled), medium (outline), or low (text only). */
  emphasis?: ButtonEmphasis;
  /** Size of the button (affects padding and typography) */
  size?: ButtonSize;
  /** Show an icon before the label (default: false) */
  leadingIcon?: boolean;
  /** Show an icon after the label (default: true) */
  trailingIcon?: boolean;
  /** Material Symbol name for the leading icon */
  leadingIconName?: MaterialSymbolIconName;
  /** Material Symbol name for the trailing icon */
  trailingIconName?: MaterialSymbolIconName;
  /** Icon variant for the leading icon (sharpFilled or sharpUnfilled / outlined) */
  leadingIconVariant?: "sharpFilled" | "sharpUnfilled";
  /** Icon variant for the trailing icon (sharpFilled or sharpUnfilled / outlined) */
  trailingIconVariant?: "sharpFilled" | "sharpUnfilled";
  /** Accessible label for the button (use when visible text is not descriptive) */
  "aria-label"?: string;
}

/** Default prop values */
export const BUTTON_DEFAULTS = {
  emphasis: "high" as const,
  size: "medium" as const,
  leadingIcon: false,
  trailingIcon: true,
  leadingIconName: "chevron_forward" as MaterialSymbolIconName,
  trailingIconName: "chevron_forward" as MaterialSymbolIconName,
  leadingIconVariant: "sharpUnfilled" as const,
  trailingIconVariant: "sharpUnfilled" as const,
} as const;

export const BUTTON_PROP_CONTROLS = {
  emphasis: {
    type: "select" as const,
    description: "Visual emphasis: high (filled), medium (outline), low (text only).",
    options: [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" },
    ],
    defaultValue: BUTTON_DEFAULTS.emphasis,
  },
  size: {
    type: "select" as const,
    description: "Size (affects padding and typography)",
    options: [
      { value: "small", label: "Small" },
      { value: "medium", label: "Medium" },
      { value: "large", label: "Large" },
    ],
    defaultValue: BUTTON_DEFAULTS.size,
  },
  leadingIcon: {
    type: "boolean" as const,
    description: "Show icon before the label",
    defaultValue: BUTTON_DEFAULTS.leadingIcon,
  },
  trailingIcon: {
    type: "boolean" as const,
    description: "Show icon after the label",
    defaultValue: BUTTON_DEFAULTS.trailingIcon,
  },
  leadingIconName: {
    type: "text" as const,
    description: "Material Symbol name for the leading icon",
    defaultValue: BUTTON_DEFAULTS.leadingIconName,
  },
  trailingIconName: {
    type: "text" as const,
    description: "Material Symbol name for the trailing icon",
    defaultValue: BUTTON_DEFAULTS.trailingIconName,
  },
  leadingIconVariant: {
    type: "select" as const,
    description: "Icon variant for the leading icon (sharpFilled or sharpUnfilled / outlined)",
    options: [
      { value: "sharpUnfilled", label: "sharpUnfilled" },
      { value: "sharpFilled", label: "sharpFilled" },
    ],
    defaultValue: BUTTON_DEFAULTS.leadingIconVariant,
  },
  trailingIconVariant: {
    type: "select" as const,
    description: "Icon variant for the trailing icon (sharpFilled or sharpUnfilled / outlined)",
    options: [
      { value: "sharpUnfilled", label: "sharpUnfilled" },
      { value: "sharpFilled", label: "sharpFilled" },
    ],
    defaultValue: BUTTON_DEFAULTS.trailingIconVariant,
  },
  disabled: {
    type: "boolean" as const,
    description: "Whether the button is disabled",
    defaultValue: false,
  },
  "aria-label": {
    type: "text" as const,
    description: "Accessible label (use when visible text is not descriptive)",
    placeholder: "Optional ARIA label for accessibility",
    defaultValue: "",
  },
} as const;

/**
 * Button component for user interactions.
 *
 * - **WCAG AA compliant**: Contrast ratios meet 4.5:1 for text
 * - **Browser-based focus ring**: Uses native outline on :focus-visible (keyboard only)
 * - **Keyboard operable**: Native <button> supports Enter and Space
 * - **ARIA**: aria-label supported for icon-only or when visible text is not descriptive
 *
 * @example
 * ```tsx
 * <Button emphasis="high" size="medium">
 *   <Typography type="Button" width text="Click me" />
 * </Button>
 * <Button emphasis="medium" trailingIcon trailingIconName="chevron_right" trailingIconVariant="sharpUnfilled">
 *   <Typography type="Button" width text="Button" />
 * </Button>
 * <Button emphasis="low">
 *   <Typography type="Button" width text="Text button" />
 * </Button>
 * <Button leadingIcon trailingIcon>
 *   <Typography type="Button" width text="With both icons" />
 * </Button>
 * ```
 */
/** Props that must not reach the DOM (fixes React "does not recognize" warning) */
const BUTTON_DOM_OMIT: readonly (keyof ButtonProps)[] = [
  "emphasis",
  "size",
  "leadingIcon",
  "trailingIcon",
  "leadingIconName",
  "trailingIconName",
  "leadingIconVariant",
  "trailingIconVariant",
];

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      emphasis = BUTTON_DEFAULTS.emphasis,
      size = BUTTON_DEFAULTS.size,
      leadingIcon = BUTTON_DEFAULTS.leadingIcon,
      trailingIcon = BUTTON_DEFAULTS.trailingIcon,
      leadingIconName = BUTTON_DEFAULTS.leadingIconName,
      trailingIconName = BUTTON_DEFAULTS.trailingIconName,
      leadingIconVariant = BUTTON_DEFAULTS.leadingIconVariant,
      trailingIconVariant = BUTTON_DEFAULTS.trailingIconVariant,
      disabled,
      className = "",
      children,
      "aria-label": ariaLabel,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled;

    const emphasisClass = EMPHASIS_TO_CLASS[emphasis];
    const classNames = [
      "uxl-button",
      `uxl-button--${emphasisClass}`,
      `uxl-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const domProps = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !BUTTON_DOM_OMIT.includes(key as keyof ButtonProps)
      )
    );

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        disabled={isDisabled}
        aria-label={ariaLabel}
        {...domProps}
      >
        {leadingIcon && (
          <span className="uxl-button__icon uxl-button__icon--leading" aria-hidden>
            <Icon iconName={leadingIconName} variant={leadingIconVariant} />
          </span>
        )}
        {children}
        {trailingIcon && (
          <span className="uxl-button__icon uxl-button__icon--trailing" aria-hidden>
            <Icon iconName={trailingIconName} variant={trailingIconVariant} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
