import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import {
  List,
  ListItem,
  Typography,
  LIST_DEFAULTS,
  LIST_ITEM_DEFAULTS,
  LIST_ITEM_PROP_CONTROLS,
} from "@uxelle/components";
import type { ListProps, ListItemProps } from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const listItemArgTypes = propControlsToArgTypes(LIST_ITEM_PROP_CONTROLS);

/** Sync shared ListItem args to per-item args when shared changes. */
function SyncSharedToPerItem(Story: React.ComponentType) {
  const [args, updateArgs] = useArgs();
  useEffect(() => {
    const updates: Record<string, unknown> = {};
    for (const propKey of LIST_ITEM_PROP_KEYS) {
      const sharedValue = args[propKey as keyof typeof args];
      if (sharedValue === undefined) continue;
      for (let i = 0; i < ITEM_COUNT; i++) {
        const n = i + 1;
        const perItemKey = `item${n}${propKey.charAt(0).toUpperCase()}${propKey.slice(1)}`;
        const current = args[perItemKey as keyof typeof args];
        if (current !== sharedValue) {
          updates[perItemKey] = sharedValue;
        }
      }
    }
    if (Object.keys(updates).length > 0) {
      updateArgs(updates);
    }
  }, [
    args.leadingSlot,
    args.trailingSlot,
    args.divider,
    args.interactive,
    args.activated,
    args.leadingIconName,
    args.trailingIconName,
    args.leadingIconVariant,
    args.trailingIconVariant,
    args.disabled,
  ]);
  return <Story />;
}

/** Add table.category to argTypes for grouped controls. */
function withCategory<T extends Record<string, object>>(
  argTypes: T,
  category: string
): T {
  return Object.fromEntries(
    Object.entries(argTypes).map(([k, v]) => [
      k,
      { ...v, table: { ...(v as { table?: object }).table, category } },
    ])
  ) as T;
}

const listItemArgs = propControlsToDefaultArgs(LIST_ITEM_PROP_CONTROLS, {
  ...LIST_ITEM_DEFAULTS,
  leadingSlot: true,
  trailingSlot: true,
  divider: true,
});

const ITEM_COUNT = 3;
const ITEM_LABELS = ["First", "Second", "Third"];

const LIST_ITEM_PROP_KEYS = Object.keys(
  LIST_ITEM_PROP_CONTROLS
) as (keyof typeof LIST_ITEM_PROP_CONTROLS)[];

/** Build per-item argTypes from shared ListItem controls. */
function buildPerItemArgTypes() {
  const argTypes: Record<string, object> = {};
  for (const propKey of LIST_ITEM_PROP_KEYS) {
    const base = listItemArgTypes[propKey] as object;
    for (let i = 0; i < ITEM_COUNT; i++) {
      const n = i + 1;
      const perItemKey = `item${n}${propKey.charAt(0).toUpperCase()}${propKey.slice(1)}`;
      argTypes[perItemKey] = {
        ...base,
        name: propKey,
        description: `${(base as { description?: string }).description ?? propKey} Overrides shared.`,
        table: {
          category: "Per-item overrides",
          subcategory: `Item ${n}`,
        },
      };
    }
  }
  return argTypes;
}

const perItemArgTypes = buildPerItemArgTypes();

/** Build per-item default args so controls show switches/text fields instead of "Set" buttons. */
function buildPerItemDefaultArgs(): Record<string, unknown> {
  const args: Record<string, unknown> = {};
  const sharedDefaults = propControlsToDefaultArgs(LIST_ITEM_PROP_CONTROLS, {
    ...LIST_ITEM_DEFAULTS,
    leadingSlot: true,
    trailingSlot: true,
    divider: true,
  });
  for (const propKey of LIST_ITEM_PROP_KEYS) {
    const defaultValue = sharedDefaults[propKey];
    for (let i = 0; i < ITEM_COUNT; i++) {
      const n = i + 1;
      const perItemKey = `item${n}${propKey.charAt(0).toUpperCase()}${propKey.slice(1)}`;
      args[perItemKey] = defaultValue;
    }
  }
  return args;
}

const perItemDefaultArgs = buildPerItemDefaultArgs();

type ListItemControlProps = Pick<
  ListItemProps,
  | "leadingSlot"
  | "trailingSlot"
  | "divider"
  | "interactive"
  | "activated"
  | "leadingIconName"
  | "trailingIconName"
  | "leadingIconVariant"
  | "trailingIconVariant"
  | "disabled"
>;

/** Allows per-item override props (item1Activated, item1Disabled, etc.) without type conflict. */
type ListStoryProps = ListProps &
  ListItemControlProps &
  { [key: string]: unknown };

/** Wrapper so Storybook shows controls for both List and ListItem props. */
function ListWithControllableItems(props: ListStoryProps) {
  const {
    leadingSlot,
    trailingSlot,
    divider,
    interactive,
    activated,
    leadingIconName,
    trailingIconName,
    leadingIconVariant,
    trailingIconVariant,
    disabled,
    ...rest
  } = props;
  const listProps = {
    verticalPadding: rest.verticalPadding,
    ordered: rest.ordered,
    className: rest.className,
  } as ListProps;
  const baseItemProps: ListItemControlProps = {
    leadingSlot,
    trailingSlot,
    divider,
    interactive,
    activated,
    leadingIconName,
    trailingIconName,
    leadingIconVariant,
    trailingIconVariant,
    disabled,
  };
  const items = Array.from({ length: ITEM_COUNT }, (_, i) => {
    const n = i + 1;
    const overrides: Partial<ListItemControlProps> = {};
    for (const propKey of LIST_ITEM_PROP_KEYS) {
      const perItemKey =
        `item${n}${propKey.charAt(0).toUpperCase()}${propKey.slice(1)}` as keyof typeof rest;
      const value = rest[perItemKey];
      if (value !== undefined) {
        (overrides as Record<string, unknown>)[propKey] = value;
      }
    }
    return {
      props: {
        leadingSlot: overrides.leadingSlot ?? leadingSlot,
        trailingSlot: overrides.trailingSlot ?? trailingSlot,
        divider: overrides.divider ?? divider,
        interactive: overrides.interactive ?? interactive,
        activated: overrides.activated ?? activated,
        leadingIconName: overrides.leadingIconName ?? leadingIconName,
        trailingIconName: overrides.trailingIconName ?? trailingIconName,
        leadingIconVariant: overrides.leadingIconVariant ?? leadingIconVariant,
        trailingIconVariant:
          overrides.trailingIconVariant ?? trailingIconVariant,
        disabled: overrides.disabled ?? disabled,
      },
      text: `${ITEM_LABELS[i]} item`,
    };
  });
  return (
    <List {...listProps}>
      {items.map(({ props: overrides, text }) => (
        <ListItem key={text} {...baseItemProps} {...overrides}>
          <Typography type="Body Medium Alt" text={text} />
        </ListItem>
      ))}
    </List>
  );
}

/** Format a prop for JSX: boolean true → propName, false → propName={false}, string → propName="value" */
function formatProp(key: string, value: unknown): string | null {
  if (value === undefined) return null;
  if (typeof value === "boolean") {
    return value ? key : `${key}={false}`;
  }
  if (typeof value === "string") {
    return `${key}="${value}"`;
  }
  return `${key}={${JSON.stringify(value)}}`;
}

/** Build accurate List + ListItem code from args, omitting defaults and redundant per-item props. */
function buildListSourceCode(args: Record<string, unknown>): string {
  const listProps: string[] = [];
  if (args.verticalPadding === false) listProps.push("verticalPadding={false}");
  if (args.ordered === true) listProps.push("ordered");
  if (args.className && String(args.className).trim())
    listProps.push(formatProp("className", args.className)!);

  const shared: Record<string, unknown> = {};
  for (const key of LIST_ITEM_PROP_KEYS) {
    const v = args[key];
    if (v !== undefined) shared[key] = v;
  }

  const defaults = propControlsToDefaultArgs(LIST_ITEM_PROP_CONTROLS, {
    ...LIST_ITEM_DEFAULTS,
  }) as Record<string, unknown>;

  const items: string[] = [];
  for (let i = 0; i < ITEM_COUNT; i++) {
    const n = i + 1;
    const itemProps: Record<string, unknown> = { ...shared };
    for (const propKey of LIST_ITEM_PROP_KEYS) {
      const perItemKey = `item${n}${propKey.charAt(0).toUpperCase()}${propKey.slice(1)}`;
      const perItemVal = args[perItemKey];
      if (perItemVal !== undefined && perItemVal !== shared[propKey]) {
        itemProps[propKey] = perItemVal;
      }
    }
    const propStrs = Object.entries(itemProps)
      .filter(
        ([k, v]) =>
          v !== undefined && (defaults[k] === undefined || v !== defaults[k])
      )
      .map(([k, v]) => formatProp(k, v))
      .filter((s): s is string => s !== null);
    const text = ITEM_LABELS[i];
    const propsPart = propStrs.length > 0 ? ` ${propStrs.join(" ")}` : "";
    items.push(
      `  <ListItem${propsPart}>\n    <Typography type="Body Medium Alt" text="${text} item" />\n  </ListItem>`
    );
  }

  const listPropsStr =
    listProps.length > 0 ? ` ${listProps.join(" ")}` : "";
  return `<List${listPropsStr}>
${items.join("\n")}
</List>`;
}

const meta = {
  title: "Components/List",
  component: ListWithControllableItems,
  decorators: [SyncSharedToPerItem],
  parameters: {
    layout: "centered",
    controls: { sort: "none" },
    docs: {
      controls: { sort: "none" },
      source: {
        transform: (
          _code: string,
          storyContext: { args?: Record<string, unknown> }
        ) => buildListSourceCode(storyContext.args ?? {}),
      },
    },
  },
  tags: ["autodocs"],
  args: {
    children: undefined,
    verticalPadding: LIST_DEFAULTS.verticalPadding,
    ordered: LIST_DEFAULTS.ordered,
    ...listItemArgs,
    ...perItemDefaultArgs,
  },
  argTypes: {
    children: {
      control: false,
      description: "ListItem components or other content",
      table: { category: "List" },
    },
    className: {
      control: "text",
      description: "Additional CSS class",
      table: { category: "List" },
    },
    verticalPadding: {
      control: "boolean",
      description: "Whether to apply vertical padding",
      table: { category: "List" },
    },
    ordered: {
      control: "boolean",
      description: "When true, renders an ordered list (ol)",
      table: { category: "List" },
    },
    ...withCategory(listItemArgTypes, "ListItem (shared)"),
    ...perItemArgTypes,
  },
} satisfies Meta<typeof ListWithControllableItems>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...LIST_DEFAULTS,
    ...LIST_ITEM_DEFAULTS,
    leadingSlot: true,
    trailingSlot: true,
    divider: true,
    ...perItemDefaultArgs,
  },
};
