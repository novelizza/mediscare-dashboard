/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        loginBg: "50px;",
      },
      colors: {
        THEME_COLOR: "#4B8673",
        THEME2_COLOR: "#5FD068",
        GROUND_COLOR: "#F6FBF4",
      },
    },
  },
  plugins: [],
};
