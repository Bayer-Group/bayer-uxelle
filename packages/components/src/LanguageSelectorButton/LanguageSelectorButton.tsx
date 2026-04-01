import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import type { MaterialSymbolIconName } from "../Icon";
import "./LanguageSelectorButton.css";

export interface LanguageSelectorButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Language code to display (e.g. "EN", "ES"). */
  languageCode?: string;
  /** Whether the associated menu is open. Chevron points up when true, down when false. */
  open?: boolean;
  /** Accessible label for the button (use when visible text is not descriptive). */
  "aria-label"?: string;
  /** @internal Omit from DOM – Menu cloneElement passes this; we compute chevron from open. */
  trailingIconName?: string;
}

/** Default prop values */
export const LANGUAGE_SELECTOR_BUTTON_DEFAULTS = {
  languageCode: "EN",
  open: false,
} as const;

export const LANGUAGE_SELECTOR_BUTTON_PROP_CONTROLS = {
  languageCode: {
    type: "text" as const,
    description: "Language code to display (e.g. EN, ES).",
    defaultValue: LANGUAGE_SELECTOR_BUTTON_DEFAULTS.languageCode,
  },
  open: {
    type: "boolean" as const,
    description: "Whether the associated menu is open. Chevron points up when true.",
    defaultValue: LANGUAGE_SELECTOR_BUTTON_DEFAULTS.open,
  },
  "aria-label": {
    type: "text" as const,
    description: "Accessible label (use when visible text is not descriptive).",
    placeholder: "Optional ARIA label for accessibility",
    defaultValue: "",
  },
} as const;

/**
 * Button used as the trigger for the Language Selector dropdown.
 *
 * - **Globe icon**: Leading icon indicating language selection.
 * - **Language code**: Displays the current language (e.g. EN, ES).
 * - **Chevron**: Trailing icon; points down when closed, up when open.
 * - **States**: Uses language-selector theme tokens for hover, pressed, and activated.
 *
 * @example
 * ```tsx
 * <LanguageSelectorButton languageCode="EN" open={isOpen} />
 * ```
 */
export const LanguageSelectorButton = forwardRef<
  HTMLButtonElement,
  LanguageSelectorButtonProps
>(
  (
    {
      languageCode = LANGUAGE_SELECTOR_BUTTON_DEFAULTS.languageCode,
      open = LANGUAGE_SELECTOR_BUTTON_DEFAULTS.open,
      className = "",
      "aria-label": ariaLabel,
      trailingIconName: _trailingIconName, // Omit: Menu cloneElement passes this; we compute chevron from open
      ...props
    },
    ref
  ) => {
    const chevronIcon: MaterialSymbolIconName = open
      ? "keyboard_arrow_up"
      : "keyboard_arrow_down";

    const classNames = [
      "uxl-language-selector-button",
      open && "uxl-language-selector-button--open",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="menu"
        {...props}
      >
        <span className="uxl-language-selector-button__icon" aria-hidden>
          <Icon iconName="language" variant="sharpUnfilled" />
        </span>
        <Typography type="Body Small" inline text={languageCode} />
        <span className="uxl-language-selector-button__icon" aria-hidden>
          <Icon iconName={chevronIcon} variant="sharpUnfilled" />
        </span>
      </button>
    );
  }
);

LanguageSelectorButton.displayName = "LanguageSelectorButton";
