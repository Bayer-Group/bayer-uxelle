import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Menu,
  Button,
  List,
  ListItem,
  Typography,
  MENU_DEFAULTS,
  MENU_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Menu",
  component: Menu,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: propControlsToDefaultArgs(MENU_PROP_CONTROLS, {
    ...MENU_DEFAULTS,
  }),
  argTypes: {
    ...propControlsToArgTypes(MENU_PROP_CONTROLS),
    trigger: {
      control: false,
      description: "Button that triggers the menu",
    },
    children: {
      control: false,
      description: "Menu content (List with ListItems, or custom content)",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...MENU_DEFAULTS,
    direction: "Top Right",
  },
  render: (args) => (
    <Menu
      {...args}
      trigger={
        <Button
          emphasis="low"
          size="large"
          trailingIcon
          trailingIconName="keyboard_arrow_down"
          trailingIconVariant="sharpUnfilled"
        >
          <Typography type="Button" width text="Open Menu" />
        </Button>
      }
    >
      <List verticalPadding={false}>
        <ListItem divider>
          <Typography text="Typography" type="Body Medium Alt" />
        </ListItem>
        <ListItem interactive trailingSlot trailingIconName="call_made" trailingIconVariant="sharpUnfilled">
          <Typography type="Body Medium Alt" text="First item" />
        </ListItem>
        <ListItem interactive trailingSlot trailingIconName="call_made" trailingIconVariant="sharpUnfilled">
          <Typography type="Body Medium Alt" text="Second item" />
        </ListItem>
      </List>
    </Menu>
  ),
};
