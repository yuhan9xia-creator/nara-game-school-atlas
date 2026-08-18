/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#071019',
        paper: '#f2f0ea',
        signal: '#7ca7ff',
      },
    },
  },
  plugins: [],
}
