import { forwardRef, type HTMLAttributes } from "react";
import "./List.css";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** ListItem components or other content for the list slot. */
  children?: React.ReactNode;
  /** Whether to apply vertical padding. Default true. */
  verticalPadding?: boolean;
  /** When true, renders an ordered list (ol); otherwise unordered (ul). */
  ordered?: boolean;
  /** Optional ARIA role. Use role="presentation" when inside a menu to hide list semantics. */
  role?: React.AriaRole;
}

/** Default prop values */
export const LIST_DEFAULTS = {
  verticalPadding: true,
  ordered: false,
} as const;

export const LIST_PROP_CONTROLS = {} as const;

/**
 * List container for ListItem components.
 *
 * - **Slot**: Accepts ListItem children (renders as li)
 * - **Layout**: Vertical stack
 * - **Semantic**: Uses ul/ol for list structure
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem>
 *     <Typography type="Body Medium Alt" text="Item" />
 *   </ListItem>
 *   <ListItem interactive>Clickable item</ListItem>
 * </List>
 * ```
 */
export const List = forwardRef<HTMLElement, ListProps>(
  (
    {
      children,
      className = "",
      verticalPadding = LIST_DEFAULTS.verticalPadding,
      ordered = LIST_DEFAULTS.ordered,
      ...props
    },
    ref
  ) => {
    const classNames = [
      "uxl-list",
      verticalPadding && "uxl-list--vertical-padding",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const commonProps = { className: classNames, ...props };

    return ordered ? (
      <ol ref={ref as React.Ref<HTMLOListElement>} {...commonProps}>
        {children}
      </ol>
    ) : (
      <ul ref={ref as React.Ref<HTMLUListElement>} {...commonProps}>
        {children}
      </ul>
    );
  }
);

List.displayName = "List";
