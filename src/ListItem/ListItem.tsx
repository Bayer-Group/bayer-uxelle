import { forwardRef, type HTMLAttributes } from "react";
import { Icon } from "../Icon";
import { Typography } from "../Typography";
import { Divider } from "../Divider";
import type { MaterialSymbolIconName } from "../Icon";
import "./ListItem.css";

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Main content (center slot). */
  children?: React.ReactNode;
  /** Content for the leading slot (e.g. icon). */
  leading?: React.ReactNode;
  /** Content for the trailing slot (e.g. icon). */
  trailing?: React.ReactNode;
  /** Whether to show the leading slot. */
  leadingSlot?: boolean;
  /** Whether to show the trailing slot. */
  trailingSlot?: boolean;
  /** Whether to show a divider below the item. */
  divider?: boolean;
  /** Whether the item is interactive (clickable). Uses button semantics when true, or anchor when href is provided. */
  interactive?: boolean;
  /** When provided with interactive, renders as <a href="..."> with role="menuitem" for accessible nav links. */
  href?: string;
  /** Material Symbol name for default leading icon when leading slot is empty. */
  leadingIconName?: MaterialSymbolIconName;
  /** Material Symbol name for default trailing icon when trailing slot is empty. */
  trailingIconName?: MaterialSymbolIconName;
  /** Icon variant for leading icon. */
  leadingIconVariant?: "sharpFilled" | "sharpUnfilled";
  /** Icon variant for trailing icon. */
  trailingIconVariant?: "sharpFilled" | "sharpUnfilled";
  /** When interactive, disables the button. */
  disabled?: boolean;
  /** Whether the item is in activated (selected) state. Implies interactive and uses activated background. */
  activated?: boolean;
}

/** Default prop values — opt-in: add leadingSlot, trailingSlot, divider as needed */
export const LIST_ITEM_DEFAULTS = {
  leadingSlot: false,
  trailingSlot: false,
  divider: false,
  interactive: false,
  activated: false,
  leadingIconName: "call_made" as MaterialSymbolIconName,
  trailingIconName: "call_made" as MaterialSymbolIconName,
  leadingIconVariant: "sharpUnfilled" as const,
  trailingIconVariant: "sharpUnfilled" as const,
} as const;

export const LIST_ITEM_PROP_CONTROLS = {
  leadingSlot: {
    type: "boolean" as const,
    description: "Whether to show the leading slot.",
    defaultValue: LIST_ITEM_DEFAULTS.leadingSlot,
  },
  trailingSlot: {
    type: "boolean" as const,
    description: "Whether to show the trailing slot.",
    defaultValue: LIST_ITEM_DEFAULTS.trailingSlot,
  },
  divider: {
    type: "boolean" as const,
    description: "Whether to show a divider below the item.",
    defaultValue: LIST_ITEM_DEFAULTS.divider,
  },
  interactive: {
    type: "boolean" as const,
    description: "Whether the item is interactive (clickable).",
    defaultValue: LIST_ITEM_DEFAULTS.interactive,
  },
  href: {
    type: "text" as const,
    description: "When provided with interactive, renders as <a> with role='menuitem' for accessible nav links.",
    defaultValue: undefined,
  },
  leadingIconName: {
    type: "text" as const,
    description: "Material Symbol name for default leading icon.",
    defaultValue: LIST_ITEM_DEFAULTS.leadingIconName,
  },
  trailingIconName: {
    type: "text" as const,
    description: "Material Symbol name for default trailing icon.",
    defaultValue: LIST_ITEM_DEFAULTS.trailingIconName,
  },
  leadingIconVariant: {
    type: "select" as const,
    description: "Icon variant for leading icon.",
    options: [
      { value: "sharpUnfilled", label: "sharpUnfilled" },
      { value: "sharpFilled", label: "sharpFilled" },
    ],
    defaultValue: LIST_ITEM_DEFAULTS.leadingIconVariant,
  },
  trailingIconVariant: {
    type: "select" as const,
    description: "Icon variant for trailing icon.",
    options: [
      { value: "sharpUnfilled", label: "sharpUnfilled" },
      { value: "sharpFilled", label: "sharpFilled" },
    ],
    defaultValue: LIST_ITEM_DEFAULTS.trailingIconVariant,
  },
  disabled: {
    type: "boolean" as const,
    description: "When interactive, disables the button.",
    defaultValue: false,
  },
  activated: {
    type: "boolean" as const,
    description: "Whether the item is in activated (selected) state. Implies interactive.",
    defaultValue: LIST_ITEM_DEFAULTS.activated,
  },
} as const;

/**
 * List item component with leading, center, and trailing regions.
 *
 * - **Children**: Pass Typography or other content for the center. Strings are wrapped in default Typography.
 * - **Props**: leading, trailing for icons; leadingSlot, trailingSlot to show/hide
 * - **States**: disabled (via disabled prop); interactive items use CSS :hover/:active
 * - **Interactive**: When true, renders as button for keyboard/click support
 *
 * @example
 * ```tsx
 * <ListItem>Item label</ListItem>
 * <ListItem divider><Typography type="Component Medium" text="Header" /></ListItem>
 * <ListItem interactive trailingSlot trailingIconName="call_made">Item with icon</ListItem>
 * ```
 */
export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (
    {
      children,
      leading,
      trailing,
      leadingSlot = LIST_ITEM_DEFAULTS.leadingSlot,
      trailingSlot = LIST_ITEM_DEFAULTS.trailingSlot,
      divider = LIST_ITEM_DEFAULTS.divider,
      interactive = LIST_ITEM_DEFAULTS.interactive,
      activated = LIST_ITEM_DEFAULTS.activated,
      href,
      role: liRole,
      leadingIconName = LIST_ITEM_DEFAULTS.leadingIconName,
      trailingIconName = LIST_ITEM_DEFAULTS.trailingIconName,
      leadingIconVariant = LIST_ITEM_DEFAULTS.leadingIconVariant,
      trailingIconVariant = LIST_ITEM_DEFAULTS.trailingIconVariant,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled;
    const isInteractive = interactive || activated;

    const content = (
      <>
        {leadingSlot && (
          <span className="uxl-list-item__slot uxl-list-item__slot--leading">
            {leading ?? (
              <span className="uxl-list-item__icon">
                <Icon iconName={leadingIconName} variant={leadingIconVariant} />
              </span>
            )}
          </span>
        )}
        <span className="uxl-list-item__slot uxl-list-item__slot--center">
          {children != null ? (
            typeof children === "string" ? (
              <Typography type="Body Medium Alt" text={children} />
            ) : (
              children
            )
          ) : (
            <Typography type="Body Medium Alt" text="Typography" />
          )}
        </span>
        {trailingSlot && (
          <span className="uxl-list-item__slot uxl-list-item__slot--trailing">
            {trailing ?? (
              <span className="uxl-list-item__icon">
                <Icon iconName={trailingIconName} variant={trailingIconVariant} />
              </span>
            )}
          </span>
        )}
        {divider && (
          <Divider
            orientation="horizontal"
            hierarchy="low"
            className="uxl-list-item__divider"
          />
        )}
      </>
    );

    const classNames = [
      "uxl-list-item",
      isInteractive && "uxl-list-item--interactive",
      activated && "uxl-list-item--active",
      isDisabled && "uxl-list-item--disabled",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    if (isInteractive) {
      if (href !== undefined) {
        const { role: _aRole, ...anchorProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
        return (
          <li ref={ref} className="uxl-list-item__li" role={liRole ?? "presentation"}>
            <a href={href} role="menuitem" className={classNames} {...anchorProps}>
              {content}
            </a>
          </li>
        );
      }
      return (
        <li ref={ref} className="uxl-list-item__li">
          <button
            type="button"
            className={classNames}
            disabled={isDisabled}
            {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
          >
            {content}
          </button>
        </li>
      );
    }

    return (
      <li
        ref={ref}
        className={classNames}
        aria-disabled={isDisabled ? true : undefined}
        {...props}
      >
        {content}
      </li>
    );
  }
);

ListItem.displayName = "ListItem";
