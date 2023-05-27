/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pkmn: ['PKMN'],
      },
      colors: {
        'pkmn-red': '#D14F2D',
        'pkmn-orange': '#F9A350',
        'pkmn-yellow': '#F8E16F',
        'pkmn-lightgreen': '#A2D181',
        'pkmn-green': '#46A257',
        'pkmn-lightblue': '#A0D0F8',
        'pkmn-blue': '#709ACA',
        'pkmn-darkblue': '#5779B9',
        'pkmn-indigo': '#91A2D8',
        'pkmn-violet': '#81709A',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
