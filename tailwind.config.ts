import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ivory: {
          DEFAULT: "#FAF8F5",
          50: "#FCFBF8",
          100: "#F7F3EC",
          200: "#EFE8DC",
          300: "#E2D7C3",
          400: "#C9BA9F",
        },
        charcoal: {
          DEFAULT: "#121316",
          950: "#08080A",
          900: "#0E0F12",
          850: "#131418",
          800: "#181A20",
          700: "#242730",
          600: "#363A45",
          500: "#505565",
        },
        gold: {
          DEFAULT: "#E5A912",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#E5A912",
          600: "#D97706",
          700: "#B45309",
          muted: "#9D7D28",
          dark: "#8C6A0D",
        },
        sand: {
          DEFAULT: "#ECE6DC",
          light: "#F5F1EA",
          dark: "#DCD3C4",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
