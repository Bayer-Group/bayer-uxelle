import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import {
  Switch,
  Typography,
  SWITCH_DEFAULTS,
  SWITCH_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

function SyncEmbeddedLabel(Story: React.ComponentType) {
  const [args, updateArgs] = useArgs<{ embedded?: boolean; label?: boolean }>();
  useEffect(() => {
    if (args.embedded && args.label !== false) {
      updateArgs({ label: false });
    }
  }, [args.embedded, args.label, updateArgs]);
  return <Story />;
}

const meta = {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  decorators: [SyncEmbeddedLabel],
  args: {
    ...propControlsToDefaultArgs(SWITCH_PROP_CONTROLS, {
      ...SWITCH_DEFAULTS,
      labelText: "Label",
    }),
  },
  argTypes: {
    ...propControlsToArgTypes(SWITCH_PROP_CONTROLS),
    // Storybook may infer `activated`; omitting a default avoids forcing controlled mode in docs.
    activated: { control: false, table: { disable: true } },
    labelText: {
      control: "text",
      description: "Label text (Typography next to the control)",
    },
    className: {
      control: "text",
      description: "Custom class name on the root label",
    },
    "aria-label": {
      control: "text",
      description:
        "Accessible name when there is no visible label (omit labelText)",
    },
  },
  render: (args) => {
    const {
      labelText,
      "aria-label": ariaLabel,
      activated: _storybookActivated,
      ...switchProps
    } = args as typeof args & {
      labelText?: string;
      "aria-label"?: string;
    };
    return (
      <Switch
        {...switchProps}
        {...(ariaLabel != null && ariaLabel !== ""
          ? { "aria-label": ariaLabel }
          : {})}
      >
        {labelText ? (
          <Typography type="Body Medium" width text={labelText} />
        ) : null}
      </Switch>
    );
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...SWITCH_DEFAULTS,
    labelText: "Label",
  },
};
