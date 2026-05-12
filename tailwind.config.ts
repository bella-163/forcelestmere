import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cele: {
          bg: "#060d12",
          panel: "#0c1821",
          teal: "#0ea5e9",
          blue: "#60a5fa",
          gold: "#d8a74f",
          violet: "#8b5cf6",
          green: "#34d399",
        },
      },
      boxShadow: {
        glow: "0 0 32px rgba(14, 165, 233, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
