/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'mobile-image': "url('./assets/images/bobbleheads-mobile-v3.png')",
        'desktop-image': "url('./assets/images/bobbleheads-final.png')",
      },
      colors: {
        rodeoDust: '#CCB69D', // Rodeo Dust (grey-beige)
        mirage: '#1C2434', // Mirage (dark grey)
        mexicanRed: '#A12529', // Mexican Red
        tuscany: '#CE633B', // Tuscany (orange-beige)
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
      keyframes: {
        driftUp: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-20px)' },
        },
      },
      animation: {
        driftUp: 'driftUp 3s ease-in-out forwards',
      },
    },
  },
  variants: {
    backgroundImage: ['responsive'],
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
