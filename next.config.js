const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])

const nextConfig = {
  webpack: (config) => {

    // Netlify CMS loader
    config.resolveLoader.alias['content'] = 'netlify-cms-loader'

    // YAML Loader
    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json', // Required by Webpack v4
      use: 'yaml-loader'
    })
    
    // SVG Loader
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    })

    return config
  },
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB'
  }
}

module.exports = withTM(nextConfig)