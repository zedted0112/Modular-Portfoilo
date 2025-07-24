/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A365D',
        secondary: '#38B2AC',
        accent: '#48BB78',
        background: 'linear-gradient(135deg, #1A365D 0%, #153E75 60%, #38B2AC 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Montserrat', 'serif'],
      }
    },
  },
  plugins: [],
}