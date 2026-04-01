import { forwardRef, useState, useCallback, type HTMLAttributes } from "react";
import { Menu } from "../Menu";
import { List } from "../List";
import { ListItem } from "../ListItem";
import { Typography } from "../Typography";
import { LanguageSelectorButton } from "../LanguageSelectorButton";
import "./LanguageSelector.css";

export interface LanguageOption {
  /** Language code (e.g. "EN", "ES"). */
  code: string;
  /** Display label (e.g. "English", "Español"). */
  label: string;
}

export interface LanguageSelectorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Currently selected language code. Controlled by the parent (e.g. from i18n context or URL). */
  value?: string;
  /** Called when the user selects a different language. Parent should update locale and re-render with new value. */
  onChange?: (code: string) => void;
  /** Available language options. Defaults to EN, ES, BR, DE. */
  options?: LanguageOption[];
}

/** Default language options */
export const LANGUAGE_SELECTOR_DEFAULT_OPTIONS: LanguageOption[] = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "BR", label: "Português" },
  { code: "DE", label: "Deutsch" },
];

/** Default prop values */
export const LANGUAGE_SELECTOR_DEFAULTS = {
  value: "EN",
  options: LANGUAGE_SELECTOR_DEFAULT_OPTIONS,
} as const;

export const LANGUAGE_SELECTOR_PROP_CONTROLS = {
  value: {
    type: "text" as const,
    description: "Currently selected language code (controlled by parent, e.g. from i18n or URL).",
    defaultValue: LANGUAGE_SELECTOR_DEFAULTS.value,
  },
} as const;

/**
 * Language selector dropdown for switching locale in enterprise applications.
 *
 * - **Controlled**: Parent owns the current locale (from i18n context, URL, or state) and passes `value`. On selection, `onChange` fires so the parent can update locale and re-render.
 * - **Trigger**: Shows current language code and chevron; opens menu on click.
 * - **Menu**: List of options in "code – label" format (e.g. "EN – English").
 *
 * @example
 * ```tsx
 * // With i18n (e.g. react-i18next)
 * <LanguageSelector
 *   value={i18n.language}
 *   onChange={(code) => i18n.changeLanguage(code)}
 *   options={[
 *     { code: "EN", label: "English" },
 *     { code: "ES", label: "Español" },
 *   ]}
 * />
 * ```
 */
export const LanguageSelector = forwardRef<HTMLDivElement, LanguageSelectorProps>(
  (
    {
      value = LANGUAGE_SELECTOR_DEFAULTS.value,
      onChange,
      options = LANGUAGE_SELECTOR_DEFAULTS.options,
      className = "",
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = useCallback(
      (nextOpen: boolean) => {
        setOpen(nextOpen);
      },
      []
    );

    const handleSelect = useCallback(
      (code: string) => {
        onChange?.(code);
        setOpen(false);
      },
      [onChange]
    );

    const selectedOption = options.find(
      (opt) => opt.code.toUpperCase() === value?.toUpperCase()
    );
    const displayCode = selectedOption?.code ?? value ?? "EN";

    const classNames = ["uxl-language-selector", className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classNames} {...props}>
        <Menu
          direction="Bottom Right"
          open={open}
          onOpenChange={handleOpenChange}
          trigger={
            <LanguageSelectorButton
              languageCode={displayCode}
              open={open}
              aria-label={`Select language. Current: ${displayCode}`}
            />
          }
        >
          <List verticalPadding={false}>
            {options.map((opt) => (
              <ListItem
                key={opt.code}
                interactive
                activated={opt.code.toUpperCase() === displayCode.toUpperCase()}
                onClick={() => handleSelect(opt.code)}
              >
                <Typography type="Body Small" text={`${opt.code} – ${opt.label}`} />
              </ListItem>
            ))}
          </List>
        </Menu>
      </div>
    );
  }
);

LanguageSelector.displayName = "LanguageSelector";
