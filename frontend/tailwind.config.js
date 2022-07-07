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
      },
      keyframes: {
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        'fade-out-down': {
          'from': {
              opacity: '1',
              transform: 'translateY(0px)'
          },
          'to': {
              opacity: '0',
              transform: 'translateY(10px)'
          },
      },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.5s ease-out",
        'fade-out-down': 'fade-out-down 0.5s ease-out',
      },
    },
  },
  plugins: [],
}
