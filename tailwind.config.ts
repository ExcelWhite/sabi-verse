import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sabi: {
          terracotta: "#C75B39",
          "terracotta-light": "#E8856A",
          "terracotta-dark": "#9A3F24",
          gold: "#D4A843",
          "gold-light": "#F0CC6B",
          "gold-dark": "#B08A2E",
          earth: "#5C4033",
          "earth-light": "#8B6F5E",
          "earth-dark": "#3A2820",
          green: "#2D6A4F",
          "green-light": "#40916C",
          "green-dark": "#1B4332",
          sand: "#F5E6D3",
          "sand-light": "#FFF8F0",
          "sand-dark": "#E8D5BC",
          ink: "#1A1A2E",
          "ink-light": "#2D2D44",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "adire-pattern":
          "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(199,91,57,0.05) 10px, rgba(199,91,57,0.05) 20px)",
        "kente-accent":
          "linear-gradient(90deg, #C75B39 0%, #D4A843 25%, #2D6A4F 50%, #D4A843 75%, #C75B39 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
