/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        aboldbeauty: {
          "primary":          "#d4628a",
          "primary-content":  "#ffffff",
          "secondary":        "#e8a0b4",
          "secondary-content":"#5a0a2a",
          "accent":           "#f7d6e0",
          "accent-content":   "#7a1a3a",
          "neutral":          "#5a3a3a",
          "neutral-content":  "#fdf6f8",
          "base-100":         "#ffffff",
          "base-200":         "#fdf2f5",
          "base-300":         "#f9e4ec",
          "base-content":     "#3a1a2a",
          "info":             "#e8a0b4",
          "success":          "#86efac",
          "warning":          "#c9a84c",
          "error":            "#e05c5c",
        },
      },
    ],
    darkTheme: false,
  },
}
