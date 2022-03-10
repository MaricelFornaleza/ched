module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      brand: {
        blue: '#0060B1',
        yellow: '#FFB400',
        red: '#E93B5A',

      },
      light: {
        100: '#ffffff',
        200: '#F5F6F9',
        300: '#E4E7EC',
        400: '#D0D5DD',

      },
      dark: {
        100: '#98A2B3',
        200: '#475467',
        300: '#272F40',
        400: '#000000',
      },
      warning: {
        DEFAULT: '#FFB400',
        dark: '#FECA84',
        light: '#FFF5E1',
      },
      error: {
        DEFAULT: '#E93B5A',
        dark: '#FF5C5C',
        light: '#FFE1E3',
      },
      info: {
        DEFAULT: '#23AAE3',
        dark: '#53C1F0',
        light: '#E1F1FF',
      },
      success: {
        DEFAULT: '#06C270',
        dark: '#47D28F',
        light: '#E1FFEF',
      }

    },
    fontFamily: {
      heading: ['Roboto Slab', 'serif'],
      body: ['Open Sans', 'sans-serif']


    },
    extend: {},
  },
  plugins: [],
}
