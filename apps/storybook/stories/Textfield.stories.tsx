import type { ChangeEvent, ComponentProps } from "react";
import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import {
  Icon,
  IconButton,
  Textfield,
  Typography,
  TEXTFIELD_DEFAULTS,
  TEXTFIELD_PROP_CONTROLS,
} from "@uxelle/components";
import { propControlsToArgTypes, propControlsToDefaultArgs } from "../utils/propControlsToArgType";
import {
  composeJsxFilterProps,
  globalJsxFilterPropsForDocs,
} from "../utils/storybookJsxFilterProps";

/**
 * **Autodocs Primary** always renders the **first exported story**. `useArgs()` follows the *active*
 * story in Docs, so a controlled field cannot be the same export as “normal” demos: embedded blocks
 * would show the wrong args. Split **Playground** (first, controlled + `useArgs`) from **Default**
 * (uncontrolled like the rest).
 *
 * @see https://storybook.js.org/docs/api/doc-blocks/doc-block-primary
 * @see https://sandroroth.com/blog/storybook-controlled-components/
 */
const withTextfieldDemoWidth: Decorator = (Story) => (
  <div style={{ width: 323 }}>
    <Story />
  </div>
);

/** Textfield-only: hide props equal to {@link TEXTFIELD_DEFAULTS}, native `type="text"`, and story-only handlers. */
function textfieldJsxFilterProps(value: unknown, key: string): boolean {
  if (key === "type" && value === "text") return false;

  if (key === "onChange" && typeof value === "function") return false;

  for (const defaultKey of Object.keys(TEXTFIELD_DEFAULTS) as (keyof typeof TEXTFIELD_DEFAULTS)[]) {
    if (key === defaultKey && value === TEXTFIELD_DEFAULTS[defaultKey]) {
      return false;
    }
  }

  return true;
}

const textfieldArgTypesBase = propControlsToArgTypes(TEXTFIELD_PROP_CONTROLS);

const meta = {
  title: "Components/Textfield",
  component: Textfield,
  decorators: [withTextfieldDemoWidth],
  parameters: {
    layout: "centered",
    controls: { sort: "alpha" },
    docs: {
      controls: { sort: "alpha" },
      story: { inline: true },
    },
    jsx: {
      filterProps: composeJsxFilterProps(globalJsxFilterPropsForDocs, textfieldJsxFilterProps),
    },
  },
  tags: ["autodocs"],
  args: {
    ...propControlsToDefaultArgs(TEXTFIELD_PROP_CONTROLS, {
      ...TEXTFIELD_DEFAULTS,
      labelText: "Email",
      placeholder: "e.g. Jane@example.com",
    }),
  },
  argTypes: {
    ...textfieldArgTypesBase,
    helperText: {
      control: "boolean",
      description: TEXTFIELD_PROP_CONTROLS.helperText.description,
      if: { arg: "validation", eq: "none" },
    },
    labelText: {
      control: "text",
      description: TEXTFIELD_PROP_CONTROLS.labelText.description,
      if: { arg: "label", truthy: true },
    },
    helperTextContent: {
      control: "text",
      description: `${TEXTFIELD_PROP_CONTROLS.helperTextContent.description} Shown when helperText is true, or when validation is success/error (overrides default copy if non-empty).`,
    },
    leadingIconName: {
      control: "text",
      description: TEXTFIELD_PROP_CONTROLS.leadingIconName.description,
      if: { arg: "leadingIcon", truthy: true },
    },
    leadingSlot: {
      control: "boolean",
      description: TEXTFIELD_PROP_CONTROLS.leadingSlot.description,
    },
    trailingIconName: {
      control: "text",
      description: TEXTFIELD_PROP_CONTROLS.trailingIconName.description,
      if: { arg: "trailingIcon", truthy: true },
    },
    trailingSlot: {
      control: "boolean",
      description: TEXTFIELD_PROP_CONTROLS.trailingSlot.description,
    },
    type: {
      control: "select",
      options: ["text", "password", "email", "search", "tel", "url"],
      description: "Native input type",
    },
    autoComplete: {
      control: "text",
      description: "Autocomplete token (e.g. email, current-password)",
    },
    className: {
      control: "text",
      description: "Class on the root wrapper",
    },
    /** Omitting `value` keeps demos uncontrolled; enabling this control pins the field and breaks typing. */
    value: {
      control: false,
      description:
        "Omit in stories (uncontrolled). Use `defaultValue` for initial text. See https://sandroroth.com/blog/storybook-controlled-components/",
    },
    defaultValue: {
      control: "text",
      description:
        "Initial text (uncontrolled). Changing this in Controls applies after the preview remounts (e.g. switch story and back, or reload).",
    },
  },
} satisfies Meta<typeof Textfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...TEXTFIELD_DEFAULTS,
    labelText: "Email",
    placeholder: "e.g. Jane@example.com",
  },
};

/**
 * WCAG-oriented defaults: visible label, `autocomplete`, stable `name`, and `spellCheck` where relevant.
 */
export const RecommendedEmail: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Uses `type="email"`, `autoComplete="email"`, and `name` so browsers and assistive tech can recognize the field. Add server-side validation for the real error path.',
      },
    },
  },
  args: {
    ...TEXTFIELD_DEFAULTS,
    labelText: "Work email",
    placeholder: "name@company.com",
    type: "email",
    autoComplete: "email",
    name: "email",
    spellCheck: false,
  },
};

/**
 * Built-in password visibility toggle (`passwordVisibilityToggle`), `autoComplete`, and helper copy.
 */
export const RecommendedPassword: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '`passwordVisibilityToggle` renders a trailing `IconButton` with `aria-pressed` and show/hide labels. Use `autoComplete="current-password"` (login) or `"new-password"` (signup).',
      },
    },
  },
  args: {
    ...TEXTFIELD_DEFAULTS,
    labelText: "Password",
    placeholder: "Enter password",
    type: "password",
    autoComplete: "current-password",
    name: "password",
    passwordVisibilityToggle: true,
    helperText: true,
    helperTextContent: "Use at least 8 characters, including a number.",
    validation: "none",
    trailingIcon: false,
  },
};

/**
 * Error validation uses `aria-invalid`, `aria-errormessage` (helper id), and `aria-live="polite"` on the helper.
 */
export const RecommendedErrorState: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'When `validation="error"`, the input exposes `aria-invalid` and `aria-errormessage`; helper text is announced via `aria-live="polite"`. Pair with server-side validation in production.',
      },
    },
  },
  args: {
    ...TEXTFIELD_DEFAULTS,
    labelText: "Email",
    placeholder: "name@company.com",
    type: "email",
    autoComplete: "email",
    name: "email",
    defaultValue: "not-an-email",
    validation: "error",
    helperTextContent: "Enter a valid email address.",
    leadingIcon: false,
  },
};

/**
 * `labelSlot`, `leading`, and `trailing` override the default label row and icon slots (same pattern as `ListItem`). Use `leadingSlot` / `trailingSlot` (or `leadingIcon` / `trailingIcon`) to show the side regions with default icons.
 */
export const ComposableSlots: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Pass `labelSlot` for custom label content inside `Label` (association via `htmlFor` is preserved). Pass `leading` / `trailing` for custom slots; when set, they replace default icons and the password toggle.",
      },
    },
  },
  args: {
    ...TEXTFIELD_DEFAULTS,
    label: true,
    labelText: "",
    leadingIcon: false,
    trailingIcon: false,
    passwordVisibilityToggle: false,
    placeholder: "Search the site…",
    autoComplete: "off",
    name: "q",
  },
  render: (args) => (
    <Textfield
      {...args}
      id="storybook-textfield-composable"
      labelSlot={<Typography type="Body Medium Alt" text="Search" truncation inline />}
      leading={<Icon iconName="search" size={24} variant="sharpUnfilled" aria-hidden />}
      trailing={
        <IconButton
          emphasis="low"
          size="medium"
          iconName="mic"
          iconVariant="sharpUnfilled"
          aria-label="Search by voice"
          type="button"
        />
      }
    />
  ),
};

/** Narrow width + long value: the middle region scrolls horizontally instead of clipping with an ellipsis. */
export const LongValueScroll: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "The input sits in `uxl-textfield__input-scroll`. With `field-sizing: content` (supported browsers), the field grows with the value and the wrapper shows a horizontal scrollbar when needed; otherwise the native input still scrolls while typing.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 220 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    ...TEXTFIELD_DEFAULTS,
    labelText: "Email",
    defaultValue: "very.long.email.address+tag@enterprise-subdomain.example-corporation.com",
    leadingIcon: true,
    leadingIconName: "mail",
    trailingIcon: true,
    trailingIconName: "cancel",
  },
};
