/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        primary: 'var(--color-primary)',
        'primary-content': 'var(--color-primary-content)',
        surface: 'var(--color-surface)',
        'surface-variant': 'var(--color-surface-variant)',
        elevation: {
          0: 'var(--color-elevation-0)',
          1: 'var(--color-elevation-1)',
          2: 'var(--color-elevation-2)',
          3: 'var(--color-elevation-3)',
          4: 'var(--color-elevation-4)',
          5: 'var(--color-elevation-5)',
        }
      },
    },
  },
  plugins: [],
};
