import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./stories/**/*.{ts,tsx,mdx}",
    "../../packages/components/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
