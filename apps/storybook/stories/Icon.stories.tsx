import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, ICON_DEFAULTS, ICON_PROP_CONTROLS } from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["!autodocs"],
  args: {
    ...propControlsToDefaultArgs(ICON_PROP_CONTROLS, { ...ICON_DEFAULTS }),
  },
  argTypes: propControlsToArgTypes(ICON_PROP_CONTROLS),
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...ICON_DEFAULTS,
  },
};