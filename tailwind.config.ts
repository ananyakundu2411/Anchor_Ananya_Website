import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0F",
          soft: "#101017",
          card: "#14141C",
          line: "#26262F",
        },
        gold: {
          DEFAULT: "#D4AF6A",
          light: "#E8CF9C",
          deep: "#A8873F",
        },
        ivory: {
          DEFAULT: "#F6F1E7",
          dim: "#CFC8B8",
        },
        blush: "#E8B4A0",
        beige: "#B8A88A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.3em",
      },
      boxShadow: {
        glow: "0 0 60px -12px rgba(212, 175, 106, 0.45)",
        card: "0 24px 60px -24px rgba(0,0,0,0.7)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(110deg, #A8873F 0%, #E8CF9C 35%, #D4AF6A 55%, #F1E3BE 75%, #A8873F 100%)",
        "stage-glow":
          "radial-gradient(ellipse 80% 55% at 50% -10%, rgba(212,175,106,0.22), transparent 65%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
