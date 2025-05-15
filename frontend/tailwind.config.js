/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'modal-enter': {
          '0%': { 
            opacity: '0',
            transform: 'translate(0, -1rem) scale(.96)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translate(0, 0) scale(1)'
          },
        }
      },
      animation: {
        'modal-enter': 'modal-enter .3s ease-out'
      },
      zIndex: {
        '60': '60',
        '70': '70'
      }
    },
  },
  plugins: [],
}