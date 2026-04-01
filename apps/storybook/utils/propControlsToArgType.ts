/**
 * Converts component PROP_CONTROLS (single source of truth in component files)
 * to Storybook argTypes format. Use this to avoid duplicating metadata in stories.
 *
 * Supports the format used by Icon and other components that export *_PROP_CONTROLS.
 */
type PropControl =
  | { type: "text"; description: string; defaultValue?: string }
  | { type: "textarea"; description: string; placeholder?: string; defaultValue?: string }
  | { type: "boolean"; description: string; defaultValue?: boolean }
  | { type: "number"; description: string; min?: number; max?: number; step?: number; defaultValue?: number }
  | {
      type: "select";
      description: string;
      options: readonly { value: string; label: string }[];
      defaultValue?: string;
    }
  | {
      type: "select";
      description: string;
      options: readonly { value: string; label: string }[];
      transform?: (value: string) => unknown;
      transformBack?: (value: unknown) => string;
      defaultValue?: unknown;
    }
  | { type: "autocomplete"; description: string; placeholder?: string; defaultValue?: string };

export type PropControls = Record<string, PropControl>;

/** Storybook conditional controls (`if`) — see https://storybook.js.org/docs/api/arg-types */
export type StorybookArgTypeIf =
  | { arg: string; truthy?: boolean; eq?: unknown; neq?: unknown; exists?: boolean }
  | { global: string; truthy?: boolean; eq?: unknown; neq?: unknown; exists?: boolean };

export type ArgTypes = Record<
  string,
  {
    control?: string | { type: string; min?: number; max?: number; step?: number };
    description?: string;
    options?: readonly string[];
    mapping?: Record<string, unknown>;
    if?: StorybookArgTypeIf;
  }
>;

/**
 * Builds default args from PROP_CONTROLS so Storybook shows controls directly
 * (textfield, select, switch) instead of "Set string" / "Set boolean" buttons.
 * Undefined args cause Storybook to show those placeholder buttons.
 */
export function propControlsToDefaultArgs<T extends Record<string, unknown>>(
  controls: PropControls,
  componentDefaults: T
): Record<string, unknown> {
  const args: Record<string, unknown> = { ...componentDefaults };

  for (const [key, config] of Object.entries(controls)) {
    if (key in args) continue; // componentDefaults already has it
    const dv = "defaultValue" in config ? config.defaultValue : undefined;
    if (dv !== undefined) {
      args[key] = dv;
    } else {
      // Fallback so control shows immediately instead of "Set" button
      switch (config.type) {
        case "text":
        case "textarea":
        case "autocomplete":
          args[key] = "";
          break;
        case "boolean":
          args[key] = false;
          break;
        case "number":
          args[key] = config.min ?? 0;
          break;
        case "select":
          args[key] = config.options[0]?.value ?? "";
          break;
      }
    }
  }
  return args;
}

export function propControlsToArgTypes(controls: PropControls): ArgTypes {
  const argTypes: ArgTypes = {};

  for (const [key, config] of Object.entries(controls)) {
    const base = { description: config.description };

    switch (config.type) {
      case "text":
      case "autocomplete":
        argTypes[key] = { ...base, control: "text" };
        break;

      case "textarea":
        argTypes[key] = { ...base, control: "text" };
        break;

      case "boolean":
        argTypes[key] = { ...base, control: "boolean" };
        break;

      case "number":
        argTypes[key] = {
          ...base,
          control: {
            type: "number",
            min: config.min,
            max: config.max,
            step: config.step,
          },
        };
        break;

      case "select": {
        const options = config.options.map((o) => o.value);
        const hasTransform = "transform" in config && config.transform;

        if (hasTransform && config.transform && config.transformBack) {
          // Build mapping: control value -> component prop value
          const mapping: Record<string, unknown> = {};
          for (const opt of config.options) {
            mapping[opt.value] = config.transform!(opt.value);
          }
          argTypes[key] = {
            ...base,
            control: "select",
            options,
            mapping,
          };
        } else {
          argTypes[key] = {
            ...base,
            control: "select",
            options,
          };
        }
        break;
      }

      default:
        argTypes[key] = base;
    }
  }

  return argTypes;
}