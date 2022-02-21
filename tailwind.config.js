const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': {'max': '639px'},
      ...defaultTheme.screens,
    },
    fontSize: {
      '4xs': '.15rem',
      '3xs': '.25rem',
      '2xs': '.50rem',
      'xs': '.75rem',
      'sm': '.875rem',
      'tiny': '.8rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem'
    },
    // maxWidth: {
    //   '4.5xl': '60rem',
    // },
    fontFamily: {
      'manrope': ['Manrope', 'sans-serif']
    },
    extend: {
      cursor: {
        'brush': 'url(brush.svg), pointer',
      },
      width: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '86': '21.5rem',
        '88': '22rem',
        '90': '22.5rem'
      },
      maxWidth: {
        '4.5xl': '60rem',
      },
      colors: {
        cloud: '#474647',
        soil: '#1a1a1a',
        sun: {
          50: '#fdf8e7',
          100: '#fbf1cf',
          200: '#f8e3a0',
          300: '#f4d670',
          400: '#f1c841',
          500: '#edba11',
          600: '#be950e',
          700: '#8e700a',
          800: '#8e700a',
          900: '#2f2503'
        },
        sky: {
          50: '#ebecfc',
          100: '#d7dafa',
          200: '#afb4f5',
          300: '#888fef',
          400: '#6069ea',
          500: '#3844e5',
          600: '#2d36b7',
          700: '#2730a0',
          800: '#161b5c',
          900: '#0b0e2e'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
