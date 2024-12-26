/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    backgroundImage: {
      main: "url('./images/menuimg/background.jpg')",
    },
    extend: {
      colors: {
        "button-color": "#004AFF",
      },
    },
  },
  plugins: [],
};
