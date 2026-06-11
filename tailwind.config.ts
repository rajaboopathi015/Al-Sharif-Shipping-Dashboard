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
        dashboard: {
          bg: "#F6F8FB",
          card: "#FFFFFF",
          primary: "#1F2937",
          secondary: "#6B7280",
          border: "#E5E7EB",
        },
      },
      borderRadius: {
        card: "4px",
        kpi: "4px",
      },
      boxShadow: {
        card: "0 6px 18px rgba(0,0,0,0.06)",
      },
      animation: {
        "fade-lift": "fadeLift 0.6s ease-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeLift: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
