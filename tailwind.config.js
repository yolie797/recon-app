
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {},
    extend: {
      colors: {
        electricLime: 'rgb(180, 229, 36)',
        deepMidnight: 'rgb(2, 40, 64)',
        hotLilac: 'rgb(153, 128, 218)',
        overTheAmazon: 'rgb(58, 59, 11)',
        clearSkiesAhead: 'rgb(128, 139, 239)',
        offWhite: 'rgb(245, 245, 245)',
      },
    },
  },
  plugins: [],
}