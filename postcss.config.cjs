// CommonJS PostCSS config — use the dedicated Tailwind PostCSS plugin
// and autoprefixer. Using a CJS config avoids ESM evaluation paths that
// Turbopack may temporarily extract outside the project root.
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

