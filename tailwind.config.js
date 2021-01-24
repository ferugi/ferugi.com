// tailwind.config.js
module.exports = {
    theme: {
      fontFamily: {
      'display': ['EB Garamond', 'serif'],
      'display-mono': ['PT Mono', 'monospace'],
      'mono': ['PT Mono', 'monospace'],
      'body': ['Montserrat', 'sans-serif']
       }
    },
    purge: [
      // Use *.tsx if using TypeScript
      './pages/**/*.tsx',
      './components/**/*.tsx'
    ]
    // ...
  }
