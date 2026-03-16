// vite.config.js
// ---------------
// Standard Vite + React config.
// The @vitejs/plugin-react plugin enables:
//   - Fast Refresh (hot reload without losing state)
//   - JSX transform (no need to import React in every file)

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // When building for Capacitor, set base to "./" so assets resolve correctly
  // base: "./",

  server: {
    port: 5173,
    // Allow access from phones on same WiFi (useful for testing)
    host: true,
  },
});
