/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
    fontFamily:{'display':["Montserrat"]},
    colors: {
      'main-color':'#252A34',
     'nav-bar-selected':'#F15412',
     'blue':'#00ADB5',
     'lightGray':'#393E46',
     'lightText':'#878a8f'
    },
    },
  },
  plugins: [],
}

