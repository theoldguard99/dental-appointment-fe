// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      boxShadow: {
        'bottom-right': '6px 6px 12px rgba(0, 0, 0, 0.3)',
      },
      zIndex: {
        '50': '50',
        '60': '60',
        '70': '70',
        '80': '80',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
