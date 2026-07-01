import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [

      // ☀️ LIGHT MODE
      {
        propertylight: {

          // BRAND
          "primary": "#4F6BFF",
          "primary-content": "#FFFFFF",

          // SIDEBAR / SURFACES
          "secondary": "#C6E33D",
          "secondary-content": "#0B1324",

          // ACTIVE / HIGHLIGHT
          "accent": "#0A1020",
          "accent-content": "#F9FAFB",

          // BASES
          "base-100": "#F3F4F6", // page bg
          "base-200": "#FFFFFF", // cards
          "base-300": "#E5E7EB", // borders/hover
          "base-content": "#0F172A",

          // NEUTRAL
          "neutral": "#1E293B",
          "neutral-content": "#FFFFFF",

          // STATUS
          "info": "#60A5FA",
          "success": "#22C55E",
          "warning": "#FACC15",
          "error": "#EF4444",

          // RADIUS
          "--rounded-box": "1rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "9999px",

          // BORDERS
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.75rem",
        },
      },

      // 🌙 DARK MODE
      {
        propertydark: {

          // BRAND
          "primary": "#5B7FFF",
          "primary-content": "#FFFFFF",

          // SIDEBAR / SURFACES
          "secondary": "#0A1020",
          "secondary-content": "#F3F4F6",

          // ACTIVE / HIGHLIGHT
          "accent": "#B8E52E",
          "accent-content": "#0A0F1F",

          // BASES
          "base-100": "#020617", // page bg
          "base-200": "#0A1020", // cards
          "base-300": "#131C31", // borders/hover
          "base-content": "#E5E7EB",

          // NEUTRAL
          "neutral": "#E5E7EB",
          "neutral-content": "#0F172A",

          // STATUS
          "info": "#60A5FA",
          "success": "#4ADE80",
          "warning": "#FACC15",
          "error": "#F87171",

          // RADIUS
          "--rounded-box": "1rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "9999px",

          // BORDERS
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.75rem",
        },
      },
    ],
  },
}