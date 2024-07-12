<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
}
=======
module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
	  extend: {},
	},
	variants: {
	  extend: {},
	},
	plugins: [],
  }
>>>>>>> 59b1ede2ccdec810678e0dc1ea69243cd5789474
