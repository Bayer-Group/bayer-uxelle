import { forwardRef, useCallback, useEffect, useId, useState } from "react";
import "./Switch.css";

export interface SwitchProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "onChange"> {
  /**
   * On/off state when controlled. When omitted, the switch is uncontrolled; use `defaultActivated` for the initial value.
   * Matches Figma property **Activated**.
   */
  activated?: boolean;
  /**
   * Initial on state when uncontrolled (`true` / `false`). Updates if this prop changes while uncontrolled. Ignored when `activated` is set.
   */
  defaultActivated?: boolean;
  /** Disables interaction and applies disabled styles. Matches Figma **Disabled**. */
  disabled?: boolean;
  /**
   * Compact layout without row padding and with no gap (e.g. inline in a cell). Matches Figma **Embedded**.
   */
  embedded?: boolean;
  /** When `false`, label content (`children`) is not rendered. Matches Figma **Label**. Default `true`. */
  label?: boolean;
  /** Called when the value changes; receives the native change event from the input. */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** Passed to the underlying input for form submission. */
  name?: string;
  /** Passed to the underlying input. */
  value?: string;
  /** Passed to the underlying input. */
  form?: string;
  /** Passed to the underlying input. */
  required?: boolean;
  /** Optional label to the right of the control (e.g. Typography). When omitted, set `aria-label` on the component for accessibility. */
  children?: React.ReactNode;
}

/** Default prop values */
export const SWITCH_DEFAULTS = {
  disabled: false,
  embedded: false,
  label: true,
} as const;

export const SWITCH_PROP_CONTROLS = {
  disabled: {
    type: "boolean" as const,
    description: "Disables interaction and applies disabled styles",
    defaultValue: SWITCH_DEFAULTS.disabled,
  },
  embedded: {
    type: "boolean" as const,
    description: "Compact embedded layout (no row padding / gap)",
    defaultValue: SWITCH_DEFAULTS.embedded,
  },
  label: {
    type: "boolean" as const,
    description: "Show label slot (children)",
    defaultValue: SWITCH_DEFAULTS.label,
  },
  defaultActivated: {
    type: "boolean" as const,
    description: "Initial on state when uncontrolled (omit `activated` for uncontrolled mode)",
    defaultValue: false,
  },
} as const;

/**
 * Toggle switch aligned to design tokens. Renders a native checkbox with `role="switch"` for forms and correct semantics.
 * Optional `children` render as label text to the right of the track; associate with `htmlFor` / `id` patterns via the root label when needed.
 *
 * @example
 * <Switch defaultActivated>
 *   <Typography type="Body Medium" width text="Notifications" />
 * </Switch>
 *
 * - **Accessibility**: Use `aria-label` when there is no visible label. Keyboard: Space toggles when focused.
 * - **Controlled**: Pass `activated` and `onChange`; omit `defaultActivated`.
 */
export const Switch = forwardRef<HTMLLabelElement, SwitchProps>(
  (
    {
      activated,
      defaultActivated,
      disabled = SWITCH_DEFAULTS.disabled,
      embedded = SWITCH_DEFAULTS.embedded,
      label: showLabel = SWITCH_DEFAULTS.label,
      onChange,
      name,
      value,
      form,
      required,
      children,
      className = "",
      id: idProp,
      ...labelProps
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = idProp ?? `uxl-switch-${reactId}`;
    const isControlled = activated !== undefined;
    const [internalChecked, setInternalChecked] = useState(() =>
      Boolean(defaultActivated)
    );

    useEffect(() => {
      if (!isControlled) {
        setInternalChecked(Boolean(defaultActivated));
      }
    }, [defaultActivated, isControlled]);

    const handleChange = useCallback<
      React.ChangeEventHandler<HTMLInputElement>
    >(
      (event) => {
        if (!isControlled) {
          setInternalChecked(event.target.checked);
        }
        onChange?.(event);
      },
      [isControlled, onChange]
    );

    const rootClass = [
      "uxl-switch",
      disabled && "uxl-switch--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <label
        ref={ref}
        className={rootClass}
        data-uxl-switch-embedded={embedded || undefined}
        {...labelProps}
      >
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          className="uxl-switch__input"
          checked={isControlled ? Boolean(activated) : internalChecked}
          disabled={disabled}
          onChange={handleChange}
          name={name}
          value={value}
          form={form}
          required={required}
        />
        <div className="uxl-switch__track" aria-hidden>
          <div className="uxl-switch__thumb" />
        </div>
        {showLabel && children != null && children !== false ? (
          <span className="uxl-switch__label">{children}</span>
        ) : null}
      </label>
    );
  }
);

Switch.displayName = "Switch";
