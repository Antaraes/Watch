/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary-color':'#1B2430',
        'secondary-color':'#6B728E'
      }
    },
  },
  plugins: [],
}
