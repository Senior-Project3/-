/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        labesni: {
          primary: '#14b8a6',
          secondary: '#0f766e',
          light: '#99f6e4',
          dark: '#0d9488',
        }
      },
    },
  },
  plugins: [],
}; 