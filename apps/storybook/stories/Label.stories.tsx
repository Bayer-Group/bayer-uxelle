import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Label,
  Typography,
  LABEL_DEFAULTS,
  LABEL_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(LABEL_PROP_CONTROLS, {
      ...LABEL_DEFAULTS,
      labelText: "Label",
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(LABEL_PROP_CONTROLS),
    labelText: {
      control: "text",
      description: "Label text (passed to Typography as children)",
    },
    htmlFor: {
      control: "text",
      description: "ID of the form control this label describes",
    },
    className: {
      control: "text",
      description: "Custom class name",
    },
  },
  render: (args) => (
    <Label
      required={args.required}
      disabled={args.disabled}
      htmlFor={args.htmlFor}
      className={args.className}
    >
      <Typography
        type="Body Medium Alt"
        text={args.labelText}
        truncation
        inline
      />
    </Label>
  ),
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...LABEL_DEFAULTS,
    labelText: "Label",
  },
};

export const Required: Story = {
  args: {
    ...LABEL_DEFAULTS,
    required: true,
    labelText: "Field name",
  },
};

export const Truncation: Story = {
  args: {
    ...LABEL_DEFAULTS,
    labelText:
      "This is a very long label text that demonstrates truncation when the container is constrained",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 200, border: "1px solid #ccc", padding: 8 }}>
        <Story />
      </div>
    ),
  ],
};

export const NoTruncation: Story = {
  args: {
    ...LABEL_DEFAULTS,
    labelText:
      "This is a very long label text that wraps when truncation is disabled",
  },
  render: (args) => (
    <Label
      required={args.required}
      disabled={args.disabled}
      htmlFor={args.htmlFor}
      className={args.className}
    >
      <Typography
        type="Body Medium Alt"
        text={args.labelText}
        truncation={false}
        inline
      />
    </Label>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 200, border: "1px solid #ccc", padding: 8 }}>
        <Story />
      </div>
    ),
  ],
};
