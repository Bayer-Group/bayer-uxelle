import React, { forwardRef } from "react";
import { isDevelopment } from "../utils/env";
import "./Typography.css";

export type TypographyType =
  | "Display Large"
  | "Display Medium"
  | "Display Small"
  | "Display Extra Small"
  | "Component Medium"
  | "Component Medium Alt"
  | "Body Medium"
  | "Body Medium Alt"
  | "Body Small"
  | "Body Small Alt"
  | "Condensed"
  | "Condensed Alt"
  | "Overline"
  | "Overline Alt"
  | "Button";

/** Text / block typography (default). */
export interface TypographyTextProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * The typography variant to use
   */
  type: TypographyType;
  /**
   * When true, width fits content; when false, width is 100%
   * @default true
   */
  width?: boolean;
  /**
   * The text content to display
   */
  text: React.ReactNode;
  /**
   * Optional HTML element to render as.
   * If not provided, defaults to semantic elements based on type:
   * - Display Large/Medium/Small → h1, h2, h3
   * - Body Medium/Small → p
   * - Overline/Button → span
   */
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * ARIA role attribute
   */
  role?: string;
  /**
   * ARIA label for accessibility
   */
  "aria-label"?: string;
  /**
   * ARIA describedby attribute
   */
  "aria-describedby"?: string;
  /**
   * When true, hides the element from screen readers (for decorative text)
   */
  "aria-hidden"?: boolean;
  /**
   * When true, truncates text with ellipsis when it overflows
   * @default false
   */
  truncation?: boolean;
  /**
   * When true, displays typography inline instead of block/flex layout
   * Useful for inline text within other components (e.g., HelperText)
   * @default false
   */
  inline?: boolean;
}

/**
 * Native input with typography styles. Use `inputHtmlType` for the HTML `type` attribute;
 * `type` is the typography variant (e.g. `"Body Small"`).
 */
export interface TypographyAsInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "size" | "width" | "className"
  > {
  type: TypographyType;
  as: "input";
  /** Ignored for inputs; present for union compatibility. */
  text?: React.ReactNode;
  width?: boolean;
  truncation?: boolean;
  inline?: boolean;
  /** Classes for the outer typography wrapper. */
  className?: string;
  /** Classes merged onto the `input` element. */
  inputClassName?: string;
  /** Native input `type` (e.g. `text`, `email`). @default "text" */
  inputHtmlType?: HTMLInputElement["type"];
}

export type TypographyProps = TypographyTextProps | TypographyAsInputProps;

/**
 * Get the default semantic HTML element based on typography type
 */
const getDefaultElement = (
  type: TypographyType
): "h1" | "h2" | "h3" | "p" | "span" => {
  switch (type) {
    case "Display Large":
      return "h1";
    case "Display Medium":
      return "h2";
    case "Display Small":
      return "h3";
    case "Body Medium":
    case "Body Medium Alt":
    case "Body Small":
    case "Body Small Alt":
    case "Component Medium":
    case "Component Medium Alt":
      return "p";
    case "Overline":
    case "Overline Alt":
    case "Button":
    case "Condensed":
    case "Condensed Alt":
    case "Display Extra Small":
    default:
      return "span";
  }
};

function buildTypographyClassParts(
  type: TypographyType,
  width: boolean,
  truncation: boolean,
  inline: boolean
) {
  const isDisplayType = type.startsWith("Display");
  const typeKebab = type.toLowerCase().replace(/\s+/g, "-");
  const typographyClass = `typography-${typeKebab}`;
  const colorClass = isDisplayType
    ? "typography-color-display"
    : "typography-color-body";
  const widthClass = width ? "typography-width-auto" : "typography-width-full";
  const containerWidthClass = width
    ? "typography-container-width-auto"
    : "typography-container-width-full";
  const textContainerWidthClass = width
    ? "typography-text-container-width-auto"
    : "typography-text-container-width-full";
  const truncationClass = truncation ? "typography-truncation" : "";
  const inlineClass = inline ? "typography-inline" : "";
  return {
    typographyClass,
    colorClass,
    widthClass,
    containerWidthClass,
    textContainerWidthClass,
    truncationClass,
    inlineClass,
  };
}

function validateTypographyType(type: TypographyType) {
  if (!isDevelopment) return;
  const validTypes: TypographyType[] = [
    "Display Large",
    "Display Medium",
    "Display Small",
    "Display Extra Small",
    "Component Medium",
    "Component Medium Alt",
    "Body Medium",
    "Body Medium Alt",
    "Body Small",
    "Body Small Alt",
    "Condensed",
    "Condensed Alt",
    "Overline",
    "Overline Alt",
    "Button",
  ];
  if (!validTypes.includes(type)) {
    console.warn(
      `Typography: Invalid type "${type}". Valid types are: ${validTypes.join(", ")}. ` +
        `Using default "Display Large".`
    );
  }
}

/**
 * Text component with multiple typography variants and responsive sizing.
 *
 * @example
 * // Display heading
 * <Typography type="Display Large" text="Main Heading" />
 *
 * @example
 * // Body text with full width
 * <Typography type="Body Medium" width={false} text="This is body text that wraps to full width" />
 *
 * @example
 * // Native input with Body Small (e.g. Textfield — long values scroll in the field wrapper, not ellipsis)
 * <Typography type="Body Small" as="input" width inputHtmlType="email" />
 */
export const Typography = forwardRef<HTMLDivElement | HTMLInputElement, TypographyProps>(
  function Typography(props, ref) {
    if (props.as === "input") {
      const {
        type,
        width = true,
        text: _text,
        as: _as,
        truncation = false,
        inline = false,
        className,
        inputClassName,
        inputHtmlType = "text",
        ...inputRest
      } = props;

      validateTypographyType(type);

      const {
        typographyClass,
        colorClass,
        widthClass,
        containerWidthClass,
        textContainerWidthClass,
        truncationClass,
        inlineClass,
      } = buildTypographyClassParts(type, width, truncation, inline);

      const textClasses = [
        "typography-text",
        typographyClass,
        colorClass,
        widthClass,
        truncationClass,
        "breakpoint",
      ]
        .filter(Boolean)
        .join(" ");

      const containerClasses = [
        "typography-container",
        containerWidthClass,
        inlineClass,
        className,
      ]
        .filter(Boolean)
        .join(" ");

      const inputClasses = [textClasses, inputClassName].filter(Boolean).join(" ");

      return (
        <div className={containerClasses}>
          <div
            className={`typography-text-container ${textContainerWidthClass}`}
          >
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              type={inputHtmlType}
              className={inputClasses}
              {...inputRest}
            />
          </div>
        </div>
      );
    }

    const {
      type,
      width = true,
      text,
      as,
      role,
      "aria-label": ariaLabel,
      "aria-describedby": ariaDescribedBy,
      "aria-hidden": ariaHidden,
      truncation = false,
      inline = false,
      className,
      ...rest
    } = props;

    validateTypographyType(type);

    if (isDevelopment && as) {
      const defaultElement = getDefaultElement(type);
      if (defaultElement.startsWith("h") && as.startsWith("h")) {
        const defaultLevel = parseInt(defaultElement[1]!, 10);
        const overrideLevel = parseInt(as[1]!, 10);
        if (overrideLevel > defaultLevel + 1) {
          console.warn(
            `Typography: Heading hierarchy violation. ` +
              `Type "${type}" defaults to ${defaultElement}, but overridden to ${as}. ` +
              `This may break document structure.`
          );
        }
      }
    }

    const Component = as || getDefaultElement(type);

    const {
      typographyClass,
      colorClass,
      widthClass,
      containerWidthClass,
      textContainerWidthClass,
      truncationClass,
      inlineClass,
    } = buildTypographyClassParts(type, width, truncation, inline);

    const ariaProps: {
      role?: string;
      "aria-label"?: string;
      "aria-describedby"?: string;
      "aria-hidden"?: boolean;
    } = {};
    if (role) ariaProps.role = role;
    if (ariaLabel) ariaProps["aria-label"] = ariaLabel;
    if (ariaDescribedBy) ariaProps["aria-describedby"] = ariaDescribedBy;
    if (ariaHidden !== undefined) ariaProps["aria-hidden"] = ariaHidden;

    if (
      (type === "Overline" || type === "Overline Alt") &&
      !ariaLabel &&
      !ariaHidden
    ) {
      ariaProps["aria-label"] =
        typeof text === "string" ? text : "Overline text";
    }

    const textClasses = [
      "typography-text",
      typographyClass,
      colorClass,
      widthClass,
      truncationClass,
      "breakpoint",
    ]
      .filter(Boolean)
      .join(" ");

    const containerClasses = [
      "typography-container",
      containerWidthClass,
      inlineClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref as React.Ref<HTMLDivElement>} className={containerClasses} {...rest}>
        <div
          className={`typography-text-container ${textContainerWidthClass}`}
        >
          <Component className={textClasses} {...ariaProps}>
            {text}
          </Component>
        </div>
      </div>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
