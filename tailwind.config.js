/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#38bdf8', // Light mode start (original)
        secondary: '#a78bfa', // Light mode end (original)
        darkPrimary: '#232946', // Dark mode start (deep blue)
        darkSecondary: '#121629', // Dark mode end (almost black)
        accent: '#22d3ee', // Accent color
        purpleHazeLightFrom: '#7b7fd7', // Muted blue-purple (State of AI Agents style)
        purpleHazeLightTo: '#b993d6',   // Soft lavender
        purpleHazeDarkFrom: '#232946',  // Purple Haze dark start
        purpleHazeDarkTo: '#121629',    // Purple Haze dark end
        greenGlassLightFrom: '#43e97b', // Green Glass light start (fresh green)
        greenGlassLightTo: '#38f9d7',   // Green Glass light end (teal)
        greenGlassDarkFrom: '#134e4a',  // Green Glass dark start
        greenGlassDarkTo: '#0f3d3e',    // Green Glass dark end
        // futureTheme1: '#...', // Placeholder for future theme
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Montserrat', 'serif'],
      }
    },
  },
  darkMode: 'class', // ← important
  plugins: [],
}