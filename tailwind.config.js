const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
      fontFamily: {
      'display': ['EB Garamond', 'serif'],
      'display-mono': ['PT Mono', 'monospace'],
      'mono': ['Inconsolata', 'monospace'],
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
