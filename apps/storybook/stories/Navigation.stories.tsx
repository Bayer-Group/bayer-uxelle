import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Navigation,
  DefaultLeadingSlot,
  DefaultCenterSlot,
  DefaultTrailingSlot,
  DefaultBottomSlot,
} from "@uxelle/components";

const meta = {
  title: "Components/Navigation",
  component: Navigation,
  parameters: {
    layout: "fullscreen",
    controls: { sort: "alpha" },
    docs: {
      controls: { sort: "alpha" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    leadingSlot: {
      control: false,
      description: "Content for the leading region (e.g. menu icon, logo, title).",
    },
    centerSlot: {
      control: false,
      description: "Content for the center region (e.g. primary nav links).",
    },
    trailingSlot: {
      control: false,
      description: "Content for the trailing region (e.g. search, language selector, login).",
    },
    bottomSlot: {
      control: false,
      description: "Content for the secondary nav bar below the primary bar.",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leadingSlot: <DefaultLeadingSlot />,
    centerSlot: <DefaultCenterSlot />,
    trailingSlot: <DefaultTrailingSlot />,
    bottomSlot: <DefaultBottomSlot />,
  },
};
