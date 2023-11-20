/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#767373',
        secondary: '#28303B',
        paper: '#f5f5f5',
        accent: '#402FFF',
        error: '#F44646',
        tertiary: '#763435',
        ActivitiesBG: '#E7DAC8',
      },
    },
    fontFamily: {
      sparky: ['Sparky Stones', 'sans-serif'], // 'Sparky Stones' should match the font name
    },
  },
  plugins: [],
};
