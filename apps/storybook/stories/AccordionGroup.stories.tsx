import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionGroup,
  Typography,
  ACCORDION_GROUP_DEFAULTS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/AccordionGroup",
  component: AccordionGroup,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(
      {
        divider: {
          type: "boolean" as const,
          description: "Whether to show dividers between accordion items.",
          defaultValue: ACCORDION_GROUP_DEFAULTS.divider,
        },
      },
      { ...ACCORDION_GROUP_DEFAULTS }
    ),
  },
  argTypes: {
    ...propControlsToArgTypes({
      divider: {
        type: "boolean" as const,
        description: "Whether to show dividers between accordion items.",
        defaultValue: ACCORDION_GROUP_DEFAULTS.divider,
      },
    }),
    children: {
      control: false,
      description: "Accordion components",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof AccordionGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

function AccordionGroupDemo(args: { divider?: boolean }) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <div style={{ width: 340 }}>
      <AccordionGroup divider={args.divider ?? ACCORDION_GROUP_DEFAULTS.divider}>
        <Accordion
          open={open1}
          onToggle={() => setOpen1((o) => !o)}
          panel={
            <Typography
              type="Body Small"
              text="First section content. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              data-color-switcher="neutral"
            />
          }
        >
          <Typography type="Component Medium Alt" text="Section 1" />
        </Accordion>
        <Accordion
          open={open2}
          onToggle={() => setOpen2((o) => !o)}
          panel={
            <Typography
              type="Body Small"
              text="Second section content. Duis mollis purus commodo, laoreet tellus ut."
              data-color-switcher="neutral"
            />
          }
        >
          <Typography type="Component Medium Alt" text="Section 2" />
        </Accordion>
        <Accordion
          open={open3}
          onToggle={() => setOpen3((o) => !o)}
          panel={
            <Typography
              type="Body Small"
              text="Third section content. Nunc semper rhoncus metus non gravida."
              data-color-switcher="neutral"
            />
          }
        >
          <Typography type="Component Medium Alt" text="Section 3" />
        </Accordion>
      </AccordionGroup>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <AccordionGroupDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          "AccordionGroup contains multiple Accordion components with dividers between items.",
      },
    },
  },
};

export const WithoutDividers: Story = {
  args: { divider: false },
  render: (args) => <AccordionGroupDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: "AccordionGroup with divider={false} hides dividers between items.",
      },
    },
  },
};
