import { forwardRef, type HTMLAttributes } from "react";
import { Typography } from "../Typography";
import "./Divider.css";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerHierarchy = "high" | "low";

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Orientation of the divider line.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
  /**
   * Visual hierarchy: high (darker, thicker) or low (lighter, thinner).
   * @default "low"
   */
  hierarchy?: DividerHierarchy;
  /**
   * Figma **Text**: show centered label between the lines (horizontal only).
   * When omitted, the label layout is used only if `children` are provided.
   */
  text?: boolean;
  /**
   * Label between the lines when `text` is true (horizontal only).
   */
  children?: React.ReactNode;
  /**
   * When true, the divider is purely decorative and hidden from assistive technologies.
   * When false or when the text layout is shown, uses role="separator" with aria-orientation.
   * @default true when `text` is false (or omitted with no children); false when text layout is shown
   */
  decorative?: boolean;
}

/** Default prop values */
export const DIVIDER_DEFAULTS = {
  orientation: "horizontal" as const,
  hierarchy: "low" as const,
  text: undefined as boolean | undefined,
  decorative: undefined as boolean | undefined,
} as const;

export const DIVIDER_PROP_CONTROLS = {
  orientation: {
    type: "select" as const,
    description: "Orientation of the divider line.",
    options: [
      { value: "horizontal", label: "Horizontal" },
      { value: "vertical", label: "Vertical" },
    ],
    defaultValue: DIVIDER_DEFAULTS.orientation,
  },
  hierarchy: {
    type: "select" as const,
    description: "Visual hierarchy: high (darker, thicker) or low (lighter, thinner).",
    options: [
      { value: "low", label: "Low" },
      { value: "high", label: "High" },
    ],
    defaultValue: DIVIDER_DEFAULTS.hierarchy,
  },
  text: {
    type: "boolean" as const,
    description:
      "Figma Text: show centered label (horizontal). Omit to derive from children.",
    defaultValue: undefined,
  },
  decorative: {
    type: "boolean" as const,
    description:
      "When true, divider is decorative and hidden from screen readers. When false, uses role='separator'.",
    defaultValue: undefined,
  },
  "aria-label": {
    type: "text" as const,
    description: "Accessible label when divider has semantic meaning (e.g. section boundary).",
    placeholder: "Optional ARIA label",
    defaultValue: "",
  },
} as const;

/**
 * Divider component for visual separation of content.
 *
 * - **WCAG AA compliant**: Uses theme tokens that meet contrast requirements
 * - **Semantic**: role="separator" with aria-orientation when not decorative
 * - **Decorative by default**: aria-hidden="true" when not showing text; use decorative={false} for semantic dividers
 *
 * @example
 * ```tsx
 * <Divider />
 * <Divider orientation="vertical" />
 * <Divider hierarchy="high" text>Section</Divider>
 * ```
 */
export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = DIVIDER_DEFAULTS.orientation,
      hierarchy = DIVIDER_DEFAULTS.hierarchy,
      text: textProp,
      decorative,
      className = "",
      children,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const textLayout =
      textProp === undefined ? Boolean(children) : textProp;
    const isDecorative = decorative ?? !textLayout;

    const classNames = [
      "uxl-divider",
      `uxl-divider--${orientation}`,
      `uxl-divider--${hierarchy}`,
      textLayout && orientation === "horizontal" && "uxl-divider--with-text",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const separatorProps = isDecorative
      ? { "aria-hidden": true as const }
      : {
          role: "separator" as const,
          "aria-orientation": orientation,
          ...(ariaLabel && { "aria-label": ariaLabel }),
        };

    if (orientation === "horizontal" && textLayout) {
      return (
        <div
          ref={ref}
          className={classNames}
          {...separatorProps}
          {...props}
        >
          <span className="uxl-divider__line" aria-hidden />
          <span className="uxl-divider__text">
            <Typography type="Condensed" text={children} />
          </span>
          <span className="uxl-divider__line" aria-hidden />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={classNames}
        {...separatorProps}
        {...props}
      >
        <span className="uxl-divider__line" aria-hidden />
      </div>
    );
  }
);

Divider.displayName = "Divider";
