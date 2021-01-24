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
        width: {
          'text': '80ch',
          'text-1/2': '40ch',
          'text-2/5': '32ch',
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
