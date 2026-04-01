import type { ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Icon,
  Link,
  Typography,
  LINK_DEFAULTS,
  LINK_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

type LinkStoryArgs = ComponentProps<typeof Link> & {
  text: string;
  showExternalIcon: boolean;
};

const meta = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(LINK_PROP_CONTROLS, {
      ...LINK_DEFAULTS,
      href: "#",
      text: "Link",
      showExternalIcon: false,
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(LINK_PROP_CONTROLS),
    href: {
      control: "text",
      description: "URL the link points to",
    },
    text: {
      control: "text",
      description: "Link text (passed to Typography as children)",
    },
    showExternalIcon: {
      control: "boolean",
      description: "Show trailing icon (Icon passed to Link `icon`)",
    },
    className: {
      control: "text",
      description: "Adding a custom class",
    },
  },
  render: (args) => {
    const { text, showExternalIcon, ...linkProps } = args;
    return (
      <Link
        {...linkProps}
        icon={
          showExternalIcon ? (
            <Icon iconName="outbound" variant="sharpUnfilled" aria-hidden />
          ) : undefined
        }
      >
        <Typography type="Body Medium" text={text} inline />
      </Link>
    );
  },
} satisfies Meta<LinkStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...LINK_DEFAULTS,
    href: "#",
    text: "Link",
  },
};
