import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import {
  Accordion,
  Typography,
  ACCORDION_DEFAULTS,
  ACCORDION_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: propControlsToDefaultArgs(ACCORDION_PROP_CONTROLS, {
    ...ACCORDION_DEFAULTS,
    divider: true,
    trailingSlot: true,
    children: "Title",
    panel: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit et lectus id posuere.",
  }),
  argTypes: {
    ...propControlsToArgTypes(ACCORDION_PROP_CONTROLS),
    children: {
      control: "text",
      description: "Main content (center slot)",
    },
    panel: {
      control: "text",
      description: "Content shown when expanded",
    },
    trailing: {
      control: false,
      description: "Content for the trailing slot",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: function DefaultAccordion(args) {
    const [, updateArgs] = useArgs();
    return (
      <div style={{ width: 340 }}>
        <Accordion
          open={args.open}
          onToggle={() => updateArgs({ open: !args.open })}
          disabled={args.disabled}
          divider={args.divider}
          trailingSlot={args.trailingSlot}
          trailingIconName={args.trailingIconName}
          trailingIconVariant={args.trailingIconVariant}
          panel={
            args.panel ? (
              <Typography type="Body Small" data-color-switcher="neutral" text={args.panel as string} />
            ) : undefined
          }
        >
          <Typography
            type="Component Medium Alt"
            text={(args.children as string) ?? "Title"}
          />
        </Accordion>
      </div>
    );
  },
};
