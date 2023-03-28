import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
  plugins: [],
} satisfies Config;
