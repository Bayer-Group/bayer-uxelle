import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ListColumns,
  LIST_COLUMNS_DEFAULTS,
} from "@uxelle/components";

const meta = {
  title: "Components/Navigation/List Columns",
  component: ListColumns,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...LIST_COLUMNS_DEFAULTS,
  },
  argTypes: {
    columns: {
      control: false,
      description: "Array of { header, links }. Omit to use default 8-column grid.",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof ListColumns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomColumns: Story = {
  args: {
    columns: [
      { header: "Products", links: [{ label: "Crop Protection", href: "#" }, { label: "Seeds", href: "#" }] },
      { header: "Resources", links: [{ label: "Documentation", href: "#" }, { label: "Support", href: "#" }] },
    ],
  },
};
