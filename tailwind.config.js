/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Eyedropped from screenshots — adjust after visual review
        navy: {
          DEFAULT: '#1B3A6B',
          dark: '#152E56',
          light: '#2A4E85',
        },
        cyan: {
          DEFAULT: '#3FBBD9',
          light: '#7DD3E8',
          dark: '#2A9BB8',
        },
        cream: '#FFFDF7',
        ink: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans Ethiopic', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(27, 58, 107, 0.08)',
        cardHover: '0 8px 30px rgba(27, 58, 107, 0.15)',
      },
    },
  },
  plugins: [],
}