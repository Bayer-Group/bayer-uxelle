import React, { forwardRef } from "react";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import "./HelperText.css";

export type HelperTextType =
  | "Neutral"
  | "Info"
  | "Danger"
  | "Warning"
  | "Success";

const HELPER_TEXT_ICONS: Record<
  HelperTextType,
  { iconName: string; variant: "sharpFilled" | "sharpUnfilled" }
> = {
  Neutral: { iconName: "info", variant: "sharpUnfilled" },
  Info: { iconName: "help", variant: "sharpUnfilled" },
  Danger: { iconName: "error", variant: "sharpFilled" },
  Warning: { iconName: "warning", variant: "sharpUnfilled" },
  Success: { iconName: "check_circle", variant: "sharpUnfilled" },
};

export interface HelperTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Visual variant: Neutral, Info, Danger, Warning, or Success
   * @default "Neutral"
   */
  helperType?: HelperTextType;
  /**
   * Simple: pass a string for the message. Composable: pass Icon and Typography as children.
   */
  children: React.ReactNode;
}

/** Default prop values */
export const HELPER_TEXT_DEFAULTS = {
  helperType: "Neutral" as HelperTextType,
} as const;

export const HELPER_TEXT_PROP_CONTROLS = {
  helperType: {
    type: "select" as const,
    description: "Visual variant for icon and color",
    options: [
      { value: "Neutral", label: "Neutral" },
      { value: "Info", label: "Info" },
      { value: "Danger", label: "Danger" },
      { value: "Warning", label: "Warning" },
      { value: "Success", label: "Success" },
    ],
    defaultValue: HELPER_TEXT_DEFAULTS.helperType,
  },
} as const;

/** Props that must not reach the DOM */
const HELPER_TEXT_DOM_OMIT: readonly (keyof HelperTextProps)[] = [
  "helperType",
];

/**
 * HelperText displays contextual messages below form fields or inputs.
 * Variants: Neutral, Info, Danger, Warning, Success.
 *
 * **Simple usage** — pass a string; default Icon and Typography are rendered:
 * <HelperText helperType="Danger">You must choose at least 1 option</HelperText>
 *
 * **Composable usage** — pass Icon and Typography as children for full control:
 * <HelperText helperType="Danger">
 *   <Icon iconName="error" variant="sharpFilled" size={16} aria-hidden />
 *   <Typography type="Condensed" text="You must choose at least 1 option" inline />
 * </HelperText>
 *
 * - **Accessibility**: Use for validation hints, character counts, or supplemental guidance.
 */
export const HelperText = forwardRef<HTMLDivElement, HelperTextProps>(
  (
    {
      helperType = HELPER_TEXT_DEFAULTS.helperType,
      children,
      className = "",
      ...rest
    },
    ref
  ) => {
    const classNames = [
      "uxl-helper-text",
      `uxl-helper-text--${helperType.toLowerCase()}`,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const domProps = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !HELPER_TEXT_DOM_OMIT.includes(key as keyof HelperTextProps)
      )
    );

    const isComposable = React.Children.toArray(children).some(
      (child) => React.isValidElement(child)
    );

    if (isComposable) {
      return (
        <div ref={ref} className={classNames} {...domProps}>
          {children}
        </div>
      );
    }

    const { iconName, variant } = HELPER_TEXT_ICONS[helperType];

    return (
      <div ref={ref} className={classNames} {...domProps}>
        <Icon
          iconName={iconName}
          size={16}
          variant={variant}
          aria-hidden
        />
        <Typography
          type="Condensed"
          width={false}
          text={children}
          inline
          className="uxl-helper-text__text"
        />
      </div>
    );
  }
);

HelperText.displayName = "HelperText";
