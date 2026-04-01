import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Typography,
  BUTTON_DEFAULTS,
  BUTTON_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(BUTTON_PROP_CONTROLS, {
      ...BUTTON_DEFAULTS,
      label: "Button",
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(BUTTON_PROP_CONTROLS),
    label: {
      control: "text",
      description: "Button label (rendered via Typography)",
    },
    className: {
      control: "text",
      description: "Adding a custom class",
    },
  },
  render: (args) => {
    const { label, ...buttonProps } = args as typeof args & { label?: string };
    return (
      <Button {...buttonProps}>
        <Typography type="Button" width text={label ?? "Button"} />
      </Button>
    );
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...BUTTON_DEFAULTS,
    label: "Button",
  },
};
