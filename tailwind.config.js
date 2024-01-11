/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        black: "#101010",
        secondaryDark: "#565656",
        secondaryLight: "#909090",
      },
    },
  },
  plugins: [],
};
