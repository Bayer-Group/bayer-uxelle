import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Footer,
  DefaultTopMainContent,
  DefaultTopLegal,
  DefaultBottomMainContent,
  DefaultBottomLegal,
  FOOTER_DEFAULTS,
  FOOTER_PROP_CONTROLS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

const meta = {
  title: "Components/Footer",
  component: Footer,
  parameters: {
    layout: "fullscreen",
    controls: { sort: "alpha" },
    docs: { controls: { sort: "alpha" } },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(FOOTER_PROP_CONTROLS, { ...FOOTER_DEFAULTS }),
    topMainContent: <DefaultTopMainContent />,
    topLegal: <DefaultTopLegal />,
    bottomMainContent: <DefaultBottomMainContent />,
    bottomLegal: <DefaultBottomLegal />,
  },
  argTypes: {
    ...propControlsToArgTypes(FOOTER_PROP_CONTROLS),
    topMainContent: {
      control: false,
      description: "Content for the top main section (e.g. columns, links, CTAs).",
    },
    topLegal: {
      control: false,
      description: "Content for the top legal section (e.g. approval code, disclaimers).",
    },
    bottomMainContent: {
      control: false,
      description: "Content for the bottom main section (e.g. logo, branding).",
    },
    bottomLegal: {
      control: false,
      description: "Content for the bottom legal section (e.g. copyright, legal copy).",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    topMainContent: <DefaultTopMainContent />,
    topLegal: <DefaultTopLegal />,
    bottomMainContent: <DefaultBottomMainContent />,
    bottomLegal: <DefaultBottomLegal />,
    showTopLegal: true,
    showBottomLegal: true,
  },
};
