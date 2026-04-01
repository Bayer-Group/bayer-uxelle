import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Divider,
  DIVIDER_DEFAULTS,
  DIVIDER_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Divider",
  component: Divider,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(DIVIDER_PROP_CONTROLS, {
      ...DIVIDER_DEFAULTS,
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(DIVIDER_PROP_CONTROLS),
    text: {
      control: "boolean",
      description:
        "Figma Text: show centered label (horizontal). Omit to derive from children.",
    },
    children: {
      control: "text",
      description: "Label when text is true (or when set implicitly via children)",
    },
    className: {
      control: "text",
      description: "Custom class name",
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...DIVIDER_DEFAULTS,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
};
