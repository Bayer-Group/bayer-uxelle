import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import {
  LanguageSelector,
  LANGUAGE_SELECTOR_DEFAULTS,
  LANGUAGE_SELECTOR_PROP_CONTROLS,
  LANGUAGE_SELECTOR_DEFAULT_OPTIONS,
} from "@uxelle/components";
import {
  propControlsToArgTypes,
  propControlsToDefaultArgs,
} from "../utils/propControlsToArgType";

/** Build source from args. Uses args (live) with fallback to initialArgs. */
function buildLanguageSelectorSourceCode(args: Record<string, unknown>): string {
  const value = args.value != null ? String(args.value) : "EN";
  const options = args.options as Array<{ code: string; label: string }> | undefined;
  const optionsStr =
    options && options.length > 0
      ? `[\n${options.map((o) => `    { code: "${o.code}", label: "${o.label}" }`).join(",\n")}\n  ]`
      : "LANGUAGE_SELECTOR_DEFAULT_OPTIONS";
  const props: string[] = [`value="${value}"`, `options={${optionsStr}}`, `onChange={(code) => updateArgs({ value: code })}`];
  if (args.className && String(args.className).trim()) {
    props.push(`className="${String(args.className)}"`);
  }
  return `<LanguageSelector\n  ${props.join("\n  ")}\n/>`;
}

const meta = {
  title: "Components/LanguageSelector",
  component: LanguageSelector,
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: {
      controls: { sort: "alpha" },
      codePanel: true,
      source: {
        type: "dynamic",
        transform: (
          _code: string,
          storyContext: { args?: Record<string, unknown>; initialArgs?: Record<string, unknown> }
        ) => buildLanguageSelectorSourceCode(storyContext.args ?? storyContext.initialArgs ?? {}),
      },
    },
  },
  tags: ["autodocs"],
  args: propControlsToDefaultArgs(LANGUAGE_SELECTOR_PROP_CONTROLS, {
    ...LANGUAGE_SELECTOR_DEFAULTS,
  }),
  argTypes: {
    ...propControlsToArgTypes(LANGUAGE_SELECTOR_PROP_CONTROLS),
    onChange: {
      control: false,
      description: "Called when the user selects a different language.",
    },
    options: {
      control: false,
      description: "Available language options.",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...LANGUAGE_SELECTOR_DEFAULTS,
    value: "EN",
    options: LANGUAGE_SELECTOR_DEFAULT_OPTIONS,
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <LanguageSelector
        {...args}
        value={args.value}
        onChange={(code) => updateArgs({ value: code })}
      />
    );
  },
};

export const WithCustomOptions: Story = {
  args: {
    value: "FR",
    options: [
      { code: "EN", label: "English" },
      { code: "FR", label: "Français" },
      { code: "DE", label: "Deutsch" },
      { code: "JA", label: "日本語" },
    ],
  },
  render: (args) => {
    const [, updateArgs] = useArgs();
    return (
      <LanguageSelector
        {...args}
        value={args.value}
        onChange={(code) => updateArgs({ value: code })}
      />
    );
  },
};

