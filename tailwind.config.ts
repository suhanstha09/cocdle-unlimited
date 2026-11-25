import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-lilita)", "Impact", "sans-serif"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      colors: {
        wood: {
          light: "#a66832",
          DEFAULT: "#7c4a21",
          dark: "#522e12",
          border: "#1f1209",
        },
        parchment: {
          light: "#faf0d7",
          DEFAULT: "#f2e1b9",
          dark: "#dec58e",
        },
        stone: {
          light: "#68707d",
          DEFAULT: "#49505b",
          dark: "#2d323a",
        },
        coc: {
          gold: "#ffd43b",
          amber: "#f59f00",
          green: "#40c057",
          greenDark: "#2b8a3e",
          red: "#fa5252",
          redDark: "#c92a2a",
          cbBlue: "#228be6",
          cbBlueDark: "#1864ab",
          cbOrange: "#fd7e14",
          cbOrangeDark: "#d9480f",
        },
      },
      boxShadow: {
        plank: "0 5px 0 #1f1209, 0 8px 18px rgba(0, 0, 0, 0.55)",
        plankPressed: "0 1px 0 #1f1209, 0 3px 8px rgba(0, 0, 0, 0.45)",
        stone: "0 8px 0 #1a1d22, 0 14px 28px rgba(0, 0, 0, 0.65)",
        tile: "0 3px 0 rgba(0, 0, 0, 0.45)",
      },
      keyframes: {
        shineSweep: {
          "0%, 72%": { transform: "translateX(-140%) skewX(-22deg)" },
          "100%": { transform: "translateX(260%) skewX(-22deg)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-6px)" },
          "40%": { transform: "translateX(6px)" },
          "60%": { transform: "translateX(-4px)" },
          "80%": { transform: "translateX(4px)" },
        },
      },
      animation: {
        shineSweep: "shineSweep 4.2s ease-in-out infinite",
        shake: "shake 0.36s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
