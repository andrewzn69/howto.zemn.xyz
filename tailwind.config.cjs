/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        mplus: ["'proxima-soft'", 'Verdana', 'sans-serif']
      },
      colors: {
        white: '#DED7D0',
        bg: '#1A191E',
        bgCode: '#1E1D23',
        bgCodeWhite: '#E1E1E1',
        gray: {
          light: '#938884',
          DEFAULT: '#7F737D',
          dark: '#413E41',
          darkest: '#322F32'
        },
        orange: {
          light: '#EDB4B9',
          DEFAULT: '#E0828D',
          dark: '#E39A65'
        },
        green: {
          light: '#8CD881',
          dark: '#7EC49D'
        },
        blue: '#8BB8D0',
        red: {
          light: '#FF7DA3',
          dark: '#D95555'
        },
        pink: '#BDA9D4',
        // UI
        background: {
          DEFAULT: '#1A191E',
          main: '#2E2D33',
          selection: '#817081',
          visualSelect: '#29292E',
          line: '#1E1D23',
          popup: '#515761',
          diff: {
            add: '#8CD881',
            change: '#6CAEC0',
            text: '#568BB4'
          }
        },
        foreground: {
          DEFAULT: '#DED7D0',
          context: '#515761',
          cursor: '#AEAFAD',
          line: '#524A51',
          selection: '#615262',
          split: '#cccccc'
        },
        border: '#686069',
        accent: '#E0828D',
        nonText: '#7F737D'
      }
    }
  },
  plugins: []
}
