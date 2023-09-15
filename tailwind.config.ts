import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        modal: {
          from: { opacity: "0" },
          to: { opacity: "0.9" },
        },
        navLink: {
          from: { transform: "translateY(1rem)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        modalAnim: "modal .25s ease",
        navAnim: "navLink .25s ease",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-purple": {
          "@apply text-purple-600 duration-300 dark:text-purple-300": {},
        },
        ".text-blue": {
          "@apply text-blue-600 duration-300 dark:text-blue-300": {},
        },
        ".text-slate": {
          "@apply text-slate-900 duration-300 dark:text-slate-100": {},
        },
        ".text-red": {
          "@apply text-red-500 duration-300 dark:text-red-300": {},
        },
        ".bg-card": {
          "@apply bg-slate-100 duration-300 dark:bg-slate-900": {},
        },
        ".bg-purple-hover": {
          "@apply hover:bg-purple-500/30 duration-300 dark:hover:bg-purple-300/30":
            {},
        },
        ".border-purple": {
          "@apply border-purple-500 duration-300 dark:border-purple-300": {},
        },
      });
    }),
  ],
};

export default config;
