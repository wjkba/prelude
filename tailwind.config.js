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
        input: "#2E2E35",
        border: "#3C3C42",
        surface: "#2A262E",
        background: "#1B181E",
      },
    },
  },
  plugins: [],
};
