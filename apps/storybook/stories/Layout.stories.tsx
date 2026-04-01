import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Layout,
  IconButton,
  LAYOUT_DEFAULTS,
  LAYOUT_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: {
      controls: { sort: "alpha" },
      description: {
        component:
          "Flexible container component with Flex and Grid layout support. Similar to MUI's Box component.\n\n"
      },
    },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(LAYOUT_PROP_CONTROLS, {
      ...LAYOUT_DEFAULTS,
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(LAYOUT_PROP_CONTROLS),
    className: {
      control: "text",
      description: "Adding a custom class",
    },
  },
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...LAYOUT_DEFAULTS,
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  render: (args) => (
    <Layout {...args}>
      <IconButton emphasis="low" iconName="add" aria-label="Add" />
      <IconButton emphasis="low" iconName="edit" aria-label="Edit" />
      <IconButton emphasis="low" iconName="delete" aria-label="Delete" />
    </Layout>
  ),
};
