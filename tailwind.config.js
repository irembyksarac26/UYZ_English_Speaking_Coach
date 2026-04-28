/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0E7490',
          800: '#155e75',
          900: '#164e63',
          950: '#083344',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
        },
        slate: {
          800: '#1E293B',
          900: '#0F172A',
        },
        cream: '#FEFCE8',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
