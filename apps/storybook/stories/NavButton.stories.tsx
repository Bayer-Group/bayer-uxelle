import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  NavButton,
  ListColumns,
  NAV_BUTTON_DEFAULTS,
  NAV_BUTTON_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Navigation/Nav Button",
  component: NavButton,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: propControlsToDefaultArgs(NAV_BUTTON_PROP_CONTROLS, {
    ...NAV_BUTTON_DEFAULTS,
  }),
  argTypes: {
    ...propControlsToArgTypes(NAV_BUTTON_PROP_CONTROLS),
    children: {
      control: false,
      description: "Menu content. Defaults to ListColumns.",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof NavButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...NAV_BUTTON_DEFAULTS,
  },
  render: (args) => (
    <NavButton {...args}>
      <ListColumns />
    </NavButton>
  ),
};

export const WithContentBetweenTags: Story = {
  args: {
    label: "Products",
  },
  render: (args) => (
    <NavButton {...args}>
      <ListColumns />
    </NavButton>
  ),
};
