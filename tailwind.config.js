/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: "class",
  theme: {
    extend: {
      gridAutoRows: {
        "140px": "minmax(140px, auto)"
      }
    },
    screens: {
      'xxs': '480px',// Custom breakpoint
      'xs': '540px', // Custom breakpoint
      'sm': '640px', // Example: Small screens
      'md': '768px', // Example: Medium screens
      'lg': '1024px', // Example: Large screens
      'xl': '1280px', // Example: Extra-large screens
    }
  },
  plugins: [],
}