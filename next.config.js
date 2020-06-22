const withPWA = require('next-pwa')

module.exports = withPWA({
  publicRuntimeConfig: {
    API_HOST: process.env.API_HOST, 
    API_PORT: process.env.API_PORT,
  },
  pwa: {
    dest: 'public'
  },
  devIndicators: {
    autoPrerender: false,
  },
})
