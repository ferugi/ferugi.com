
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const watchNetlifyCmsConfig = requireTypescript('./content-watcher.ts')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
      /* development only config options here */

      watchNetlifyCmsConfig('./netlify-cms-config.yml')
  }

  return {
  }
}

function requireTypescript(path) {
    const fileContent = require('fs').readFileSync(path, 'utf8')
    const compiled = require('@babel/core').transform(
        fileContent,
        {
            filename: path,
            presets: ['@babel/preset-typescript'],
            plugins: ['@babel/plugin-transform-modules-commonjs']
        },
    )

    return eval(compiled.code)
}
