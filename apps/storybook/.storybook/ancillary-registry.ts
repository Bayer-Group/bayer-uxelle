/**
 * Ancillary registry: reads theme manifest to get ancillary modes per theme.
 * Used to show the ancillary dropdown when color switcher is "ancillary" and
 * the current theme has more than one ancillary mode.
 */

import manifest from "../../../themes/manifest.json";

type ManifestOutput = {
  file: string;
  collections?: Record<
    string,
    {
      attribute: string;
      modes: string[];
    }
  >;
};

function collectAncillaryModes(): Map<string, string[]> {
  const map = new Map<string, string[]>();
  const files = manifest.files as Record<string, { outputs: ManifestOutput[] }>;

  for (const _folder of Object.values(files)) {
    const outputs = _folder.outputs ?? [];
    for (const output of outputs) {
      const ancillary = output.collections?.Ancillary;
      if (ancillary?.modes?.length) {
        // file is e.g. "pharma/hyrnuo-hcp.css" -> theme id "hyrnuo-hcp"
        const themeId = output.file.replace(/^.*\/([^/]+)\.css$/, "$1");
        map.set(themeId, ancillary.modes);
      }
    }
  }

  return map;
}

const ancillaryByTheme = collectAncillaryModes();

/** Get ancillary modes for a theme (e.g. ["100", "200"]). Empty if theme has none. */
export function getAncillaryModesForTheme(themeId: string): string[] {
  return ancillaryByTheme.get(themeId) ?? [];
}

/** Whether the ancillary dropdown should be shown (ancillary selected + >1 modes). */
export function shouldShowAncillaryDropdown(
  colorSwitcher: string,
  themeId: string
): boolean {
  if (colorSwitcher !== "ancillary") return false;
  const modes = getAncillaryModesForTheme(themeId);
  return modes.length > 1;
}

/** All unique ancillary modes across themes, for toolbar items. */
const allModes = Array.from(
  new Set(Array.from(ancillaryByTheme.values()).flat())
).sort();

export const ANCILLARY_TOOLBAR_ITEMS = allModes.map((value) => ({
  value,
  title: value,
}));
