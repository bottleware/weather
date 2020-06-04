const tailwindcss = require('tailwindcss');

module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    tailwindcss('./tailwind.js'), require('autoprefixer'),
  ],
};
