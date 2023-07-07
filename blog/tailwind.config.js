/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'dark-purple': '#421869', 
        'primary-purple': '#BF99F2',
        'light-purple': '#995BD5', 
        'light-green': '#9CF945', 
        'normal-purple': '#721CB8', 
        'normal-green': '#8EDF34', 
      }
    },
  },
  plugins: [],
}