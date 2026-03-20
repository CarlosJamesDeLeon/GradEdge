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
      keyframes: {
        'prestige-pulse': {
          '0%, 100%': { transform: 'translateY(0px) scale(1)', filter: 'drop-shadow(0 0 0px rgba(255, 215, 0, 0))' },
          '50%': { transform: 'translateY(-6px) scale(1.02)', filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.5))' },
        }
      },
      animation: {
        'prestige-pulse': 'prestige-pulse 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
