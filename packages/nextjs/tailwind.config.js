/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "scaffoldEthDark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        tokenLight: {
          primary: "#1A202C",
          "primary-content": "#FFFFFF",
          secondary: "#7286a9",
          "secondary-content": "#FFFFFF",
          accent: "#718096",
          "accent-content": "#FFFFFF",
          neutral: "#4A5568",
          "neutral-content": "#FFFFFF",
          "base-100": "#F7FAFC",
          "base-200": "#EDF2F7",
          "base-300": "#d0d7e0",
          "base-content": "#2D3748",
          info: "#1A202C",
          success: "#38A169",
          warning: "#D97706",
          error: "#E53E3E",
          "--rounded-btn": "9999rem",
          ".tooltip": {
            "--tooltip-tail": "6px",
          },
        },
      },
      {
        tokenDark: {
          primary: "#2D3748",
          "primary-content": "#F7FAFC",
          secondary: "#3e4758",
          "secondary-content": "#F7FAFC",
          accent: "#718096",
          "accent-content": "#F7FAFC",
          neutral: "#F7FAFC",
          "neutral-content": "#4A5568",
          "base-100": "#4A5568",
          "base-200": "#1A202C",
          "base-300": "#0D1117",
          "base-content": "#F7FAFC",
          info: "#4A5568",
          success: "#38A169",
          warning: "#D97706",
          error: "#E53E3E",
          "--rounded-btn": "9999rem",
          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--p))",
          },
        },
      },
    ],
  },
  theme: {
    // Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
    extend: {
      fontFamily: {
        "bai-jamjuree": ["Bai Jamjuree", "sans-serif"],
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        grow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.1, 1.1)" },
        },
      },
      animation: {
        grow: "grow 5s linear infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        zoom: "zoom 1s ease infinite",
      },
    },
  },
};
