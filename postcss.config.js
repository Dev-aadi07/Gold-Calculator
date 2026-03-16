// postcss.config.js
// ------------------
// PostCSS processes your CSS before it reaches the browser.
// Tailwind works as a PostCSS plugin — this file wires them together.
// autoprefixer adds vendor prefixes (-webkit-, -moz-) automatically.

export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
