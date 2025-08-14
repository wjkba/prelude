/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#A63C71",
        input: "#2E2E35",
        border: "#3C3C42",
        surface: "#2A2A30",
        background: "#1B181E",
        textPrimary: "#FFFFFF",
        textSecondary: "#D0D0D5",
      },
    },
  },
  plugins: [],
};
