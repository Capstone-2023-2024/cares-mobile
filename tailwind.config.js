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
        customADC2D2: '#ADC2D2',
      },
    },
  },
  plugins: [],
};
