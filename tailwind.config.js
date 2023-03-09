module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        main: '#272756'
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')],
  corePlugins: {
    preflight: false
  }
};
