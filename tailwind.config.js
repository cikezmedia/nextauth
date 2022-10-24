/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layout/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightPurple: '#e0c0ff',
        darkPurple: '#150426',
        mainPurple: '#590aa5',
      },
    },
  },
  plugins: [],
};
