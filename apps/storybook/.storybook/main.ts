import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  viteFinal: async (config) => {
    const { searchForWorkspaceRoot } = await import("vite");
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@themes": resolve(__dirname, "../../../themes"),
        },
      },
      server: {
        ...config.server,
        fs: {
          ...config.server?.fs,
          allow: [searchForWorkspaceRoot(process.cwd())],
        },
      },
    };
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
