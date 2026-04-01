import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type MouseEvent,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { HelperText } from "../HelperText";
import { Icon } from "../Icon";
import { IconButton } from "../IconButton";
import { Label } from "../Label";
import { Typography } from "../Typography";
import "./Textfield.css";

export type TextfieldValidation = "none" | "success" | "error";

export interface TextfieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * When false, the label row is not rendered.
   * @default true
   */
  label?: boolean;
  /**
   * Visible label string; paired with `Label` and `Typography` (Body Medium Alt).
   * Ignored when `labelSlot` is set.
   */
  labelText?: string;
  /**
   * Composable label: replaces the default `Typography` inside `Label` while keeping
   * `htmlFor` / `required` / `disabled` on `Label`. Pass `id` on `Textfield` when you need a stable association.
   */
  labelSlot?: ReactNode;
  /**
   * When true, shows helper text below the field (`HelperText`).
   * `validation` `"success"` or `"error"` also shows the helper row (with default or custom copy).
   * @default false
   */
  helperText?: boolean;
  /**
   * Custom helper message when `helperText` is true.
   * If omitted, uses defaults: neutral / success / error copy matching Figma examples.
   */
  helperTextContent?: ReactNode;
  /** Validation tone for helper text and icon. @default "none" */
  validation?: TextfieldValidation;
  /**
   * When true, shows the leading icon slot.
   * @default false
   */
  leadingIcon?: boolean;
  /**
   * Same as `leadingIcon` — aligns with ListItem / Figma “Leading Slot” naming.
   * @default false
   */
  leadingSlot?: boolean;
  /** Material Symbol when `leadingIcon` is true and `leading` is not set. @default "add" */
  leadingIconName?: string;
  leadingIconVariant?: "sharpFilled" | "sharpUnfilled";
  /**
   * Composable leading region (e.g. custom `Icon` or `IconButton`). When set, overrides the default leading icon.
   */
  leading?: ReactNode;
  /**
   * When true, shows the trailing icon slot.
   * @default false
   */
  trailingIcon?: boolean;
  /**
   * Same as `trailingIcon` — aligns with ListItem / Figma “Trailing Slot” naming.
   * @default false
   */
  trailingSlot?: boolean;
  /** Material Symbol when `trailingIcon` is true and `trailing` / password toggle are not used. @default "visibility_off" */
  trailingIconName?: string;
  trailingIconVariant?: "sharpFilled" | "sharpUnfilled";
  /**
   * Composable trailing region. When set, overrides `passwordVisibilityToggle` and the default trailing icon.
   */
  trailing?: ReactNode;
  /**
   * Renders an accessible control that toggles the input between `password` and `text`.
   * Ignored when `trailing` is set. Uses internal state; pair with `autoComplete="current-password"` (or `new-password`) in apps.
   * @default false
   */
  passwordVisibilityToggle?: boolean;
  /** `aria-label` on the password toggle when the value is masked. @default "Show password" */
  showPasswordAriaLabel?: string;
  /** `aria-label` on the password toggle when the value is visible. @default "Hide password" */
  hidePasswordAriaLabel?: string;
}

export const TEXTFIELD_DEFAULTS = {
  label: true,
  validation: "none" as TextfieldValidation,
  helperText: false,
  leadingIcon: false,
  leadingSlot: false,
  trailingIcon: false,
  trailingSlot: false,
  leadingIconName: "add",
  trailingIconName: "visibility_off",
  passwordVisibilityToggle: false,
} as const;

export const TEXTFIELD_PROP_CONTROLS = {
  label: {
    type: "boolean" as const,
    description: "Show label row (Label + Typography)",
    defaultValue: TEXTFIELD_DEFAULTS.label,
  },
  labelText: {
    type: "text" as const,
    description: "Label text (Body Medium Alt); ignored if labelSlot is set",
    defaultValue: "Label",
  },
  validation: {
    type: "select" as const,
    description: "Helper text and validation tone",
    options: [
      { value: "none", label: "none" },
      { value: "success", label: "success" },
      { value: "error", label: "error" },
    ],
    defaultValue: TEXTFIELD_DEFAULTS.validation,
  },
  helperText: {
    type: "boolean" as const,
    description:
      "Show helper text row (also shown automatically when validation is success or error)",
    defaultValue: TEXTFIELD_DEFAULTS.helperText,
  },
  helperTextContent: {
    type: "textarea" as const,
    description: "Helper message when helperText is true (optional; else defaults by validation)",
    defaultValue: "",
  },
  placeholder: {
    type: "text" as const,
    description: "Native input placeholder",
    defaultValue: "",
  },
  disabled: {
    type: "boolean" as const,
    description: "Disabled state",
    defaultValue: false,
  },
  readOnly: {
    type: "boolean" as const,
    description: "Read-only state (token background, no hover/focus ring)",
    defaultValue: false,
  },
  leadingIcon: {
    type: "boolean" as const,
    description:
      "Show leading slot (ignored if leading is set); same as leadingSlot (ListItem-style name)",
    defaultValue: TEXTFIELD_DEFAULTS.leadingIcon,
  },
  leadingSlot: {
    type: "boolean" as const,
    description: "Show leading slot; alias of leadingIcon for Figma / ListItem naming",
    defaultValue: TEXTFIELD_DEFAULTS.leadingSlot,
  },
  leadingIconName: {
    type: "text" as const,
    description: "Leading icon name when leadingIcon is true",
    defaultValue: TEXTFIELD_DEFAULTS.leadingIconName,
  },
  trailingIcon: {
    type: "boolean" as const,
    description:
      "Show trailing slot (ignored if trailing or passwordVisibilityToggle); same as trailingSlot",
    defaultValue: TEXTFIELD_DEFAULTS.trailingIcon,
  },
  trailingSlot: {
    type: "boolean" as const,
    description: "Show trailing slot; alias of trailingIcon for Figma / ListItem naming",
    defaultValue: TEXTFIELD_DEFAULTS.trailingSlot,
  },
  trailingIconName: {
    type: "text" as const,
    description: "Trailing icon name when trailingIcon is true",
    defaultValue: TEXTFIELD_DEFAULTS.trailingIconName,
  },
  passwordVisibilityToggle: {
    type: "boolean" as const,
    description:
      "Password show/hide toggle (trailing IconButton); ignored if trailing is set. Use type=\"password\".",
    defaultValue: TEXTFIELD_DEFAULTS.passwordVisibilityToggle,
  },
} as const;

function helperTypeForValidation(v: TextfieldValidation): "Neutral" | "Success" | "Danger" {
  if (v === "success") return "Success";
  if (v === "error") return "Danger";
  return "Neutral";
}

function defaultHelperTextContent(validation: TextfieldValidation): string {
  if (validation === "success") return "Looks good.";
  if (validation === "error") return "Check the format — try name@example.com.";
  return "Password must be 8 characters long";
}

/**
 * Single-line text input with design tokens, optional `Label`, icon slots, and `HelperText`.
 * Associates label and helper with the input for accessibility.
 *
 * **Simple API** — `labelText`, `leadingIcon` / `trailingIcon`, and icon names.
 *
 * **Composable API** — `labelSlot`, `leading`, and `trailing` (same idea as `ListItem` slots). Use `leadingIcon` / `trailingIcon` or the equivalent `leadingSlot` / `trailingSlot` flags to show the side regions.
 *
 * **Password visibility** — `passwordVisibilityToggle` renders an accessible trailing toggle (unless `trailing` is set).
 *
 * @example
 * <Textfield labelText="Email" placeholder="e.g. name@example.com" leadingIcon helperText />
 *
 * @example
 * <Textfield
 *   labelText="Password"
 *   type="password"
 *   passwordVisibilityToggle
 *   autoComplete="current-password"
 *   name="password"
 * />
 *
 * - **Accessibility**: Pass `id` for stable `label` association; use `autoComplete` for known field types; pass `aria-label` when `label={false}`.
 */
export const Textfield = forwardRef<HTMLInputElement, TextfieldProps>(
  (
    {
      label: showLabel = TEXTFIELD_DEFAULTS.label,
      labelText = "",
      labelSlot,
      helperText: showHelperText = TEXTFIELD_DEFAULTS.helperText,
      helperTextContent,
      validation = TEXTFIELD_DEFAULTS.validation,
      leadingIcon = TEXTFIELD_DEFAULTS.leadingIcon,
      leadingSlot = TEXTFIELD_DEFAULTS.leadingSlot,
      leadingIconName = TEXTFIELD_DEFAULTS.leadingIconName,
      leadingIconVariant = "sharpUnfilled",
      leading,
      trailingIcon = TEXTFIELD_DEFAULTS.trailingIcon,
      trailingSlot = TEXTFIELD_DEFAULTS.trailingSlot,
      trailingIconName = TEXTFIELD_DEFAULTS.trailingIconName,
      trailingIconVariant = "sharpUnfilled",
      trailing,
      passwordVisibilityToggle = TEXTFIELD_DEFAULTS.passwordVisibilityToggle,
      showPasswordAriaLabel = "Show password",
      hidePasswordAriaLabel = "Hide password",
      className = "",
      disabled,
      readOnly,
      id: idProp,
      required,
      "aria-describedby": ariaDescribedByProp,
      "aria-invalid": ariaInvalidProp,
      "aria-errormessage": ariaErrorMessageProp,
      type: nativeInputType = "text",
      ...rest
    },
    ref
  ) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const setInputRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref != null) {
          (ref as MutableRefObject<HTMLInputElement | null>).current = node;
        }
      },
      [ref]
    );

    const focusInputFromField = (e: MouseEvent<HTMLDivElement>) => {
      if (disabled) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, a, [role="button"]')) return;
      inputRef.current?.focus();
    };

    const reactId = useId();
    const inputId = idProp ?? `uxl-textfield-${reactId}`;
    const helperId = `${inputId}-helper`;
    const showHelperRow =
      showHelperText ||
      validation === "success" ||
      validation === "error";
    const resolvedHelperContent = showHelperRow
      ? (() => {
          if (
            helperTextContent !== undefined &&
            helperTextContent !== null &&
            (typeof helperTextContent !== "string" || helperTextContent.length > 0)
          ) {
            return helperTextContent;
          }
          return defaultHelperTextContent(validation);
        })()
      : null;
    const hasHelper =
      resolvedHelperContent !== null &&
      resolvedHelperContent !== undefined &&
      (typeof resolvedHelperContent !== "string" || resolvedHelperContent.length > 0);

    const leadingRegionEnabled = leadingIcon || leadingSlot;
    const trailingRegionEnabled = trailingIcon || trailingSlot;

    const effectiveLeadingIconName = leadingRegionEnabled
      ? leadingIconName.length > 0
        ? leadingIconName
        : TEXTFIELD_DEFAULTS.leadingIconName
      : undefined;
    const effectiveTrailingIconName = trailingRegionEnabled
      ? trailingIconName.length > 0
        ? trailingIconName
        : TEXTFIELD_DEFAULTS.trailingIconName
      : undefined;

    const showBuiltInPasswordToggle =
      passwordVisibilityToggle && trailing === undefined;

    const effectiveInputType = showBuiltInPasswordToggle
      ? passwordVisible
        ? "text"
        : "password"
      : nativeInputType;

    const describedByHelperId =
      hasHelper && validation !== "error" ? helperId : undefined;
    const errorMessageId = validation === "error" && hasHelper ? helperId : undefined;

    const ariaDescribedBy = [ariaDescribedByProp, describedByHelperId]
      .filter(Boolean)
      .join(" ");

    const ariaInvalid =
      ariaInvalidProp !== undefined
        ? ariaInvalidProp
        : validation === "error"
          ? true
          : undefined;

    const ariaErrormessage = ariaErrorMessageProp ?? errorMessageId ?? undefined;

    const rootClass = [
      "uxl-textfield",
      disabled && "uxl-textfield--disabled",
      readOnly && "uxl-textfield--read-only",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderLeading = () => {
      if (leading !== undefined) {
        return (
          <span className="uxl-textfield__slot uxl-textfield__slot--leading">{leading}</span>
        );
      }
      if (!effectiveLeadingIconName) return null;
      return (
        <span className="uxl-textfield__slot uxl-textfield__slot--leading">
          <Icon
            iconName={effectiveLeadingIconName}
            size={24}
            variant={leadingIconVariant}
            aria-hidden
          />
        </span>
      );
    };

    const togglePasswordVisible = () => {
      setPasswordVisible((v) => !v);
    };

    const renderTrailing = () => {
      if (trailing !== undefined) {
        return (
          <span className="uxl-textfield__slot uxl-textfield__slot--trailing">{trailing}</span>
        );
      }
      if (showBuiltInPasswordToggle) {
        const toggleDisabled = Boolean(disabled || readOnly);
        const label = passwordVisible ? hidePasswordAriaLabel : showPasswordAriaLabel;
        return (
          <span className="uxl-textfield__slot uxl-textfield__slot--trailing uxl-textfield__slot--action">
            <IconButton
              type="button"
              emphasis="low"
              size="medium"
              iconName={passwordVisible ? "visibility_off" : "visibility"}
              iconVariant={trailingIconVariant}
              disabled={toggleDisabled}
              aria-label={label}
              aria-pressed={passwordVisible}
              onClick={(e) => {
                e.stopPropagation();
                if (!toggleDisabled) togglePasswordVisible();
              }}
            />
          </span>
        );
      }
      if (!effectiveTrailingIconName) return null;
      return (
        <span className="uxl-textfield__slot uxl-textfield__slot--trailing">
          <Icon
            iconName={effectiveTrailingIconName}
            size={24}
            variant={trailingIconVariant}
            aria-hidden
          />
        </span>
      );
    };

    const showLabelRow =
      showLabel &&
      (labelSlot !== undefined || labelText.length > 0);

    return (
      <div className={rootClass}>
        {showLabelRow ? (
          <Label htmlFor={inputId} required={required} disabled={Boolean(disabled)}>
            {labelSlot !== undefined ? (
              labelSlot
            ) : (
              <Typography type="Body Medium Alt" text={labelText} truncation inline />
            )}
          </Label>
        ) : null}
        <div
          className="uxl-textfield__field"
          data-color-switcher="neutral"
          onClick={focusInputFromField}
        >
          {renderLeading()}
          <div className="uxl-textfield__input-scroll">
            <Typography
              {...rest}
              type="Body Small"
              as="input"
              width
              ref={setInputRef}
              className="uxl-textfield__input-typography"
              inputClassName="uxl-textfield__input"
              inputHtmlType={effectiveInputType}
              id={inputId}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              aria-describedby={ariaDescribedBy || undefined}
              aria-invalid={ariaInvalid}
              aria-errormessage={ariaErrormessage}
            />
          </div>
          {renderTrailing()}
        </div>
        {hasHelper ? (
          <HelperText
            id={helperId}
            helperType={helperTypeForValidation(validation)}
            aria-live={validation === "error" ? "polite" : undefined}
          >
            {resolvedHelperContent}
          </HelperText>
        ) : null}
      </div>
    );
  }
);

Textfield.displayName = "Textfield";
