import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  IconButton,
  ICON_BUTTON_DEFAULTS,
  ICON_BUTTON_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(ICON_BUTTON_PROP_CONTROLS, {
      ...ICON_BUTTON_DEFAULTS,
      "aria-label": "Add item",
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(ICON_BUTTON_PROP_CONTROLS),
    className: {
      control: "text",
      description: "Adding a custom class",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...ICON_BUTTON_DEFAULTS,
    "aria-label": "Add item",
  },
};
