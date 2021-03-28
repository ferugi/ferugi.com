const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
      fontFamily: {
      'display': ['EB Garamond', 'serif'],
      'display-mono': ['PT Mono', 'monospace'],
      'mono': ['monospace'],
      'body': ['Open Sans', 'sans-serif']
      },
      extend: {
        colors: {
          'beige': '#FFFCF9',
          'light-blue': colors.lightBlue,
        },
        maxWidth: {
          'text': '67ch',
          'text-12': '12ch',
          'text-32': '32ch',
        },
        height: theme => {
          // Adds vertical heights, 1-100
          const output = {}

          for (let i = 1; i < 100; i++) {
            output[`screen-${i}`] = `${i}vh`
          }

          return output
        }
      }
    },
    purge: [
      // Use *.tsx if using TypeScript
      './pages/**/*.tsx',
      './components/**/*.tsx'
    ]
    // ...
  }
