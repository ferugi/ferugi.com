const withTM = require('next-transpile-modules')(['@react-three/drei', 'three'])

const redirects = async () => {
  return [
    {
      // Replace old blog posts
      source: '/:yyyy(\\d{4})/:mm(\\d{2})/:dd(\\d{2})/:id',
      destination: '/blog/:id',
      permanent: true,
    },
  ]
}

const webpack = (config) => {

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
}

const nextConfig = {
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB'
  },
  redirects,
  webpack,
}

module.exports = withTM(nextConfig)