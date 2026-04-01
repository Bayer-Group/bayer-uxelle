import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import {
  List,
  ListItem,
  Typography,
  LIST_ITEM_DEFAULTS,
  LIST_ITEM_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

function SyncActivatedInteractive(Story: React.ComponentType) {
  const [args, updateArgs] = useArgs<{ activated?: boolean; interactive?: boolean }>();
  useEffect(() => {
    if (args.activated && !args.interactive) {
      updateArgs({ interactive: true });
    }
  }, [args.activated, args.interactive]);
  return <Story />;
}

const meta = {
  title: "Components/ListItem",
  component: ListItem,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  decorators: [SyncActivatedInteractive],
  args: propControlsToDefaultArgs(LIST_ITEM_PROP_CONTROLS, {
    ...LIST_ITEM_DEFAULTS,
    leadingSlot: true,
    trailingSlot: true,
    divider: true,
    children: "Typography",
  }),
  argTypes: (() => {
    const rest = propControlsToArgTypes(LIST_ITEM_PROP_CONTROLS);
    return {
      ...rest,
    children: {
      control: "text",
      description: "Main content (center slot)",
    },
    leading: {
      control: false,
      description: "Content for the leading slot",
    },
    trailing: {
      control: false,
      description: "Content for the trailing slot",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  };
})(),
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <List>
      <ListItem
        leadingSlot={args.leadingSlot}
        trailingSlot={args.trailingSlot}
        divider={args.divider}
        interactive={args.interactive}
        activated={args.activated}
        disabled={args.disabled}
        {...(args.leadingSlot && {
          leadingIconName: args.leadingIconName,
          leadingIconVariant: args.leadingIconVariant,
        })}
        {...(args.trailingSlot && {
          trailingIconName: args.trailingIconName,
          trailingIconVariant: args.trailingIconVariant,
        })}
        className={args.className}
      >
        <Typography type="Body Medium Alt" text={args.children || "Typography"} />
      </ListItem>
    </List>
  ),
};
