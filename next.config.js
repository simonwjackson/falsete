const withPWA = require('next-pwa')

module.exports = withPWA({
  publicRuntimeConfig: {
    SERVER: process.env.SERVER,
    PORT: process.env.PORT,
  },
  pwa: {
    dest: 'public'
  },
  devIndicators: {
    autoPrerender: false,
  },
})
