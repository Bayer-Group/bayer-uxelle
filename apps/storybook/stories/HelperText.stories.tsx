import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HelperText,
  Icon,
  Typography,
  HELPER_TEXT_DEFAULTS,
  HELPER_TEXT_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/HelperText",
  component: HelperText,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(HELPER_TEXT_PROP_CONTROLS, {
      ...HELPER_TEXT_DEFAULTS,
      message: "Password must be 8 characters long",
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(HELPER_TEXT_PROP_CONTROLS),
    message: {
      control: "text",
      description: "Helper message text",
    },
    className: {
      control: "text",
      description: "Custom class name",
    },
  },
  render: (args) => (
    <HelperText
      helperType={args.helperType}
      className={args.className}
    >
      {args.message}
    </HelperText>
  ),
} satisfies Meta<typeof HelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...HELPER_TEXT_DEFAULTS,
    message: "Password must be 8 characters long",
  },
};

export const Neutral: Story = {
  args: {
    helperType: "Neutral",
    message: "Password must be 8 characters long",
  },
};

export const Info: Story = {
  args: {
    helperType: "Info",
    message: "Password must be 8 characters long",
  },
};

export const Danger: Story = {
  args: {
    helperType: "Danger",
    message: "You must choose at least 1 option",
  },
};

export const Warning: Story = {
  args: {
    helperType: "Warning",
    message: "You have almost exceeded your limit",
  },
};

export const Success: Story = {
  args: {
    helperType: "Success",
    message: "All checks complete",
  },
};

export const Composable: Story = {
  args: {
    helperType: "Danger",
  },
  render: (args) => (
    <HelperText helperType={args.helperType}>
      <Icon
        iconName="error"
        size={16}
        variant="sharpFilled"
        aria-hidden
      />
      <Typography
        type="Condensed"
        width={false}
        text="You must choose at least 1 option"
        inline
      />
    </HelperText>
  ),
};
