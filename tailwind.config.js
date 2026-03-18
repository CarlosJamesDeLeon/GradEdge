/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'oxford-blue': '#002147',
        'academic-gold': '#FFD700',
        'off-white': '#F8FAFC',
        'ghost-grey': '#94A3B8',
        'background': '#F8FAFC',
        'surface': '#FFFFFF',
        'primary': '#002147',
        'secondary': '#FFD700',
        'text-primary': '#002147',
        'text-secondary': '#64748B'
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
