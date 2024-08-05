/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rodeoDust: '#CCB69D', // Rodeo Dust (grey-beige)
        mirage: '#1C2434', // Mirage (dark grey)
        mexicanRed: '#A12529', // Mexican Red
        tuscany: '#CE633B', // Tuscany (orange-beige)
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
