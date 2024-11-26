/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: "#0192d0",
        gray: "#353535",
        darker: "#212121",
        white: "#f1f1f1",
        black: "#030303",
        borders: "#292929",
      },
    },
  },
};
