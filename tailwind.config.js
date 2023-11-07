/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt'],
        livvic: ['Livvic'],
        quicksand: ['Quicksand'],
      },
    },
  },
  plugins: [],
};
