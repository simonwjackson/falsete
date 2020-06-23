const process = require('process')
const withPWA = require('next-pwa')
const { path } = require('ramda')

module.exports = withPWA({
  publicRuntimeConfig: {
    API_HOST: path(['env','API_HOST'], process), 
    API_PORT: path(['env','API_PORT'], process), 
  },
  pwa: {
    dest: 'public'
  },
  devIndicators: {
    autoPrerender: false,
  },
})
