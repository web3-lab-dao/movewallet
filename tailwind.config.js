const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'packages/ui/components/**/*.{tx,tsx}',
    'packages/ui/screens/**/*.{tx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi-Variable', ...defaultTheme.fontFamily.sans],
        heading: ['Chillax-Variable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
