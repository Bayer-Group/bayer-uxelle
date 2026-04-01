import { forwardRef } from "react";
import { Typography } from "../Typography";
import "./Label.css";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** When true, shows an asterisk to indicate a required field */
  required?: boolean;
  /** When true, applies disabled styling */
  disabled?: boolean;
}

/** Default prop values */
export const LABEL_DEFAULTS = {
  required: false,
  disabled: false,
} as const;

export const LABEL_PROP_CONTROLS = {
  required: {
    type: "boolean" as const,
    description: "Show asterisk to indicate required field",
    defaultValue: LABEL_DEFAULTS.required,
  },
  disabled: {
    type: "boolean" as const,
    description: "Apply disabled styling",
    defaultValue: LABEL_DEFAULTS.disabled,
  },
} as const;

/** Props that must not reach the DOM */
const LABEL_DOM_OMIT: readonly (keyof LabelProps)[] = [
  "required",
  "disabled",
];

/**
 * Label component for form fields and inputs.
 * Composable: pass Typography (or other content) as children.
 * Label renders the required asterisk when needed.
 *
 * @example
 * <Label required>
 *   <Typography type="Body Medium Alt" text="Field name" truncation />
 * </Label>
 *
 * - **Accessibility**: Renders as semantic <label>. Associate with form controls via htmlFor.
 * - **States**: Required (asterisk), disabled.
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      required = LABEL_DEFAULTS.required,
      disabled = LABEL_DEFAULTS.disabled,
      className = "",
      ...rest
    },
    ref
  ) => {
    const classNames = [
      "uxl-label",
      required && "uxl-label--required",
      disabled && "uxl-label--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const domProps = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) => !LABEL_DOM_OMIT.includes(key as keyof LabelProps)
      )
    );

    return (
      <label ref={ref} className={classNames} {...domProps}>
        {required && (
          <Typography
            type="Body Medium"
            text="*"
            inline
            className="uxl-label__asterisk"
            aria-hidden
          />
        )}
        <span className="uxl-label__content">
          {children}
        </span>
        
      </label>
    );
  }
);

Label.displayName = "Label";
