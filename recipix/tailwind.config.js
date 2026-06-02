/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          light: '#E2ECE9',
          medium: '#8FA89B',
          dark: '#5F7D6D',
        },
        charcoal: {
          dark: '#2C2C2A',
          medium: '#3D3D3A',
          light: '#7E7E7A',
        },
        white: {
          pure: '#FFFFFF',
          warm: '#FBFBF9',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-6px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(6px)' },
        }
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}
