/**
 * Storybook docs “Show code” builds JSX via `react-element-to-jsx-string`, configured by
 * `parameters.jsx` (see `@storybook/react` jsxDecorator). The default `filterProps` only omits
 * `undefined`; empty strings and noisy “inactive” DOM flags still appear.
 *
 * Storybook does **not** hide args that match your TypeScript/component defaults — only
 * `Component.defaultProps` when `showDefaultProps` is false (the default). Per-component
 * defaults (e.g. `TEXTFIELD_DEFAULTS`) still need a local `filterProps` composed with
 * {@link composeJsxFilterProps}.
 */

/** Return `true` to keep the prop in the generated snippet. */
export type JsxFilterPropsFn = (value: unknown, key: string) => boolean;

/**
 * Global snippet cleanup for all stories: drop empty text props and common non-state DOM args.
 */
export function globalJsxFilterPropsForDocs(value: unknown, key: string): boolean {
  if (value === undefined) return false;
  // Keep controlled / uncontrolled input values in snippets — `value=""` is meaningful, not noise.
  if (value === "" && key !== "value" && key !== "defaultValue") return false;

  if (
    (key === "disabled" || key === "readOnly" || key === "required") &&
    value === false
  ) {
    return false;
  }

  return true;
}

/** Use when a meta/story sets `parameters.jsx.filterProps` so global rules still apply. */
export function composeJsxFilterProps(...filters: JsxFilterPropsFn[]): JsxFilterPropsFn {
  return (value, key) => filters.every((fn) => fn(value, key));
}
