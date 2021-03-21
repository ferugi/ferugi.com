// tailwind.config.js
module.exports = {
    theme: {
      fontFamily: {
      'display': ['EB Garamond', 'serif'],
      'display-mono': ['PT Mono', 'monospace'],
      'mono': ['PT Mono', 'monospace'],
      'body': ['Montserrat', 'sans-serif']
      },
      textColor: {
        'primary': 'rgba(0,0,0, 0.8)'
      },
      extend: {
        maxWidth: {
          'text': '80ch',
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
