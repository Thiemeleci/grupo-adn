import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        adn: {
          bg: "#020503",
          bg2: "#040806",
          bg3: "#071108",
          green1: "#1A7F3C",
          green2: "#2DAA4F",
          green3: "#3BCB66",
          gold1: "#B68A2E",
          gold2: "#D4A74A",
          text: "#FFFFFF",
          text2: "#D8D8D8",
          text3: "#A5A5A5",
        },
      },
      boxShadow: {
        premium: "0 18px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

