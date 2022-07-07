/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "textDark" : "#0C0053",
        "accent" : "#6CBCC7"
      }
    },
  },
  plugins: [],
}
