const colors = require('tailwindcss/colors')

const addRange = (name, units, from, to) => {
  const output = {}

  for (let i = from; i < to; i++) {
    output[name + i] = i + units
  }

  return output
}

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
          'text-24': '24ch',
          'text-32': '32ch',
        },
        height: theme => addRange('screen-', 'vh', 1, 100)
      }
    },
    purge: [
      // Use *.tsx if using TypeScript
      './pages/**/*.tsx',
      './components/**/*.tsx'
    ]
    // ...
  }
