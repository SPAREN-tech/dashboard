const colors = require('tailwindcss/colors');
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      title: ['Montserrat', ...fontFamily.sans],
      body: ['Inter', ...fontFamily.sans],
      alt: ['Syne', ...fontFamily.sans],
    },
    extend: {
      colors: {
        cyan: colors.cyan,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@headlessui/tailwindcss'),
    require('tailwind-children'),
  ],
};
