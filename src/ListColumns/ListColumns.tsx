import { List } from "../List";
import { ListItem } from "../ListItem";
import { Typography } from "../Typography";
import "./ListColumns.css";

export interface ListColumn {
  header: string;
  links: { label: string; href: string }[];
}

export interface ListColumnsProps {
  /** Columns to render. Each column has a header and links. Omit when using children. */
  columns?: ListColumn[];
  /** Custom content. When provided, replaces the default columns. */
  children?: React.ReactNode;
}

const DEFAULT_LINK = { label: "List Item", href: "#" };
const DEFAULT_COLUMNS: ListColumn[] = Array.from({ length: 8 }, () => ({
  header: "Header",
  links: [DEFAULT_LINK, DEFAULT_LINK, DEFAULT_LINK, DEFAULT_LINK],
}));

/** Default prop values */
export const LIST_COLUMNS_DEFAULTS = {
  columns: undefined,
  children: undefined,
} as const;

export const LIST_COLUMNS_PROP_CONTROLS = {
  columns: {
    type: "text" as const,
    control: false,
    description: "Array of { header, links }. Omit when using children.",
    defaultValue: undefined,
  },
  children: {
    type: "text" as const,
    control: false,
    description: "Custom content. When provided, replaces the default columns.",
    defaultValue: undefined,
  },
} as const;

function ListColumnGroup({
  header,
  links,
}: {
  header: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="uxl-navigation-list-columns__group" role="group" aria-label={header}>
      <List verticalPadding role="presentation">
        <ListItem interactive={false} leadingSlot={false} trailingSlot={false}>
          <Typography type="Body Medium Alt" text={header} />
        </ListItem>
        {links.map((link, i) => (
          <ListItem
            key={i}
            divider={false}
            interactive
            href={link.href}
            leadingSlot={false}
            trailingSlot={false}
          >
            <Typography type="Body Medium" text={link.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

/**
 * Grid of list columns for navigation menu content. 4 columns × 2 rows by default.
 */
export function ListColumns({
  columns = DEFAULT_COLUMNS,
  children,
}: ListColumnsProps) {
  return (
    <div className="uxl-navigation-list-columns">
      {children ??
        columns.map((col, i) => (
          <ListColumnGroup key={i} header={col.header} links={col.links} />
        ))}
    </div>
  );
}

ListColumns.displayName = "ListColumns";
