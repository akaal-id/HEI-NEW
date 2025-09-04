/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xl': '1280px', // MacBook Pro M2 13" breakpoint
      },
      colors: {
        black: '#344450',
        white: '#fcfcfc',
        yellow: '#fdad00',
        brown: '#492f32',
        accent: '#d93732',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #d93732, #492f32)',
        'gradient-secondary': 'linear-gradient(135deg, #593a19, #d8793a)',
      },
      scale: {
        '120': '1.2',
      },
    },
  },
  plugins: [],
}