/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: [ "Inter", "system-ui" ]
      },
      screens: {
        "tablet": "660px",
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant("not-focus-within", "&:not(:focus-within)");
    },
  ],
}