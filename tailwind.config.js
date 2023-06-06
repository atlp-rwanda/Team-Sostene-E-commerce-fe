/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      orange: '#FF8C42',
      translucent: '#0000001b',
      white: '#fff',
      black: '#000',
      gray: '#808080',
    },
    screens: {
      tablet: '640px',
      phone: '360px',
      laptop: '1024px',
      desktop: '1280px',
    },
  },
  plugins: [],
};