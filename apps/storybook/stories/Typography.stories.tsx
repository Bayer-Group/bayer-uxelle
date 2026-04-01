import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "@uxelle/components";

const meta = {
  title: "Components/Typography",
  component: Typography,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  argTypes: {
    text: {
      control: "text",
      description: "The text content to display",
    },
    type: {
      control: "select",
      options: [
        "Display Large",
        "Display Medium",
        "Display Small",
        "Display Extra Small",
        "Component Medium",
        "Component Medium Alt",
        "Body Medium",
        "Body Medium Alt",
        "Body Small",
        "Body Small Alt",
        "Condensed",
        "Condensed Alt",
        "Overline",
        "Overline Alt",
        "Button",
      ],
    },
    width: {
      control: "boolean",
      description: "When true, width fits content; when false, width is 100%",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    as: {
      control: "select",
      options: ["p", "span", "div", "h1", "h2", "h3", "h4", "h5", "h6"],
    },
    truncation: {
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    inline: {
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
  },
  args: {
    type: "Display Large",
    text: "Display Large",
    width: false,
    truncation: false,
    inline: false,
  },
  render: (args) => <Typography {...args} />,
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "Display Large",
    text: "Display Large",
  },
};
