const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])

const nextConfig =  {
  webpack: (config) => {

    // Netlify CMS loader
    config.resolveLoader.alias['content'] = 'netlify-cms-loader'

    // YAML Loader
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json', // Required by Webpack v4
      use: 'yaml-loader'
    })
    

    return config
  }
}

module.exports = withTM(nextConfig)