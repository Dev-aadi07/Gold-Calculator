/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// -------------------
// Tailwind scans your src/ files and removes unused CSS in production.
// The `amber` color palette is perfect for a gold theme — it ranges
// from light gold (amber-100) to very dark (amber-950).

export default {
  // content: tells Tailwind WHICH files to scan for class names
  // Without this, Tailwind doesn't know which classes you're using and strips everything
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",  // All JS/JSX files in src and subdirectories
  ],
  theme: {
    extend: {
      // You could add custom colors or spacing here.
      // For example, a precise gold color:
      // colors: {
      //   gold: "#d4af37",
      // }
    },
  },
  plugins: [],
};
