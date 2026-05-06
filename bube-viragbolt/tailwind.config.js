/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:    { 50: '#FBF7F2', 100: '#F6EFE6', 200: '#EFE4D4' },
        rose:     { 50: '#FBEEEE', 100: '#F4D9D9', 200: '#E9BDBD', 300: '#D89A9A', 400: '#B97A7A', 500: '#8E5757' },
        eucalypt: { 50: '#EEF2EC', 100: '#DDE6D8', 200: '#B8C9AE', 300: '#8FA785', 400: '#6E8867', 500: '#4F6549' },
        terra:    { 100: '#EBD7CA', 200: '#D6B4A0', 300: '#B98770', 400: '#8E5E47' },
        ink:      { 700: '#3E2F2A', 800: '#2A1F1B' },
      },
      fontFamily: {
        serif:    ['"Playfair Display"', 'Georgia', 'serif'],
        serifAlt: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:     ['Inter', 'system-ui', 'sans-serif'],
        sansAlt:  ['Manrope', 'system-ui', 'sans-serif'],
        mono:     ['"DM Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        petal: '0 20px 50px -25px rgba(142, 87, 87, 0.25), 0 8px 20px -10px rgba(78, 101, 73, 0.12)',
        card:  '0 8px 24px -12px rgba(62, 47, 42, 0.18)',
      },
    },
  },
  plugins: [],
}
