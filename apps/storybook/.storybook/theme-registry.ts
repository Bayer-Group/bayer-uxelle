/**
 * Theme registry: auto-discovers all themes from themes directory.
 * Convention: each CSS file defines :root[data-{filename}]="light|dark"
 * e.g. healthcare-provider-hub.css -> data-healthcare-provider-hub
 */

/** Import all theme CSS files (eager = load at build time). Path relative to this file. */
const themeModules = import.meta.glob("../../../themes/**/*.css", { eager: true });

function kebabToTitle(kebab: string): string {
  return kebab
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export interface ThemeEntry {
  id: string;
  title: string;
  dataAttribute: string;
}

/** All discovered themes, sorted by id */
export const themes: ThemeEntry[] = Object.keys(themeModules)
  .map((path) => {
    const id = path.replace(/^.*\/([^/]+)\.css$/, "$1");
    return {
      id,
      title: kebabToTitle(id),
      dataAttribute: `data-${id}`,
    };
  })
  .sort((a, b) => a.id.localeCompare(b.id));

/** Map theme id → data attribute for DOM application */
export const themeDataAttributes = Object.fromEntries(
  themes.map((t) => [t.id, t.dataAttribute])
) as Record<string, string>;

/** Toolbar items for Storybook globalTypes */
export const themeToolbarItems = themes.map((t) => ({
  value: t.id,
  title: t.title,
}));
