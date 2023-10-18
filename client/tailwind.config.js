/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkGreen:"#435334",  
        secondary:"#9EB384",
        tertiary:"#CEDEBD",
        lightBg : '#FAF1E4'   
      },
      fontFamily:{
          primary:'Inter, sans-serif'
      }
    },
  },
  plugins: [],
}

