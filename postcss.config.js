const tailwindcss = require('tailwindcss');

module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    tailwindcss('./tailwind.js'), require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.js',
        './public/*.html',
      ],
      css: ['./src/tailwind.css'],
      defaultExtractor: content => content.match(/[A-Za-z0-9-:_/]+/g) || []
    })
  ],
};
