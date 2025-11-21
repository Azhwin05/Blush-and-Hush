/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#162C3E', // Admin Blue
        secondary: '#D9D9D9', // Grey
        accent: '#E26D5C', // Deep Rose (keeping as accent)
        background: '#FFFFFF', // White
        text: '#162C3E', // Dark Blue Text
        muted: '#9CA3AF', // Muted text
        highlight: '#D4AF37', // Gold
        neutral: '#EDE0D4', // Beige
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
