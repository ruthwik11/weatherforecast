/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
      colors: {
        'dark-brown': '#3d3634',
        'modal-brown': '#6b5d57',
        cream: '#f5f1ed',
        'card-bg': '#d1ccc8',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
