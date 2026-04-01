import { Menu } from "../Menu";
import { Button } from "../Button";
import { Typography } from "../Typography";
import { ListColumns } from "../ListColumns";

export interface NavButtonProps {
  /** Button label. */
  label?: string;
  /** Menu content. Defaults to ListColumns. */
  children?: React.ReactNode;
  /** When set, adds data-color-switcher for use in secondary nav (match bar: typically `"secondary"`). */
  dataColorSwitcher?: string;
}

/** Default prop values */
export const NAV_BUTTON_DEFAULTS = {
  label: "Menu Link",
  dataColorSwitcher: undefined,
} as const;

export const NAV_BUTTON_PROP_CONTROLS = {
  label: {
    type: "text" as const,
    description: "Button label.",
    defaultValue: NAV_BUTTON_DEFAULTS.label,
  },
  dataColorSwitcher: {
    type: "text" as const,
    description: "Adds data-color-switcher for secondary nav (e.g. 'secondary').",
    defaultValue: NAV_BUTTON_DEFAULTS.dataColorSwitcher,
  },
} as const;

/**
 * Nav button: Menu with Button trigger. Used in Navigation center and bottom slots.
 */
export function NavButton({
  label = NAV_BUTTON_DEFAULTS.label,
  children,
  dataColorSwitcher = NAV_BUTTON_DEFAULTS.dataColorSwitcher,
}: NavButtonProps) {
  return (
    <Menu
      direction="Bottom Left"
      trigger={
        <Button
          emphasis="low"
          size="small"
          trailingIcon
          trailingIconName="keyboard_arrow_down"
          trailingIconVariant="sharpUnfilled"
          data-color-switcher={dataColorSwitcher}
        >
          <Typography type="Body Small" width text={label} />
        </Button>
      }
    >
      {children ?? <ListColumns />}
    </Menu>
  );
}

NavButton.displayName = "NavButton";
