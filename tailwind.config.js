/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts,scss}'],
  theme: {
    extend: {
      colors: {
        primary: '#0d47a1',
        secondary: '#1976d2',
        accent: '#e3f2fd'
      },
      borderRadius: {
        xl: '1rem'
      }
    },
  },
  plugins: [],
}
