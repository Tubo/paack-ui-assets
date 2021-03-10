module.exports = {
  multipass: true,
  plugins: [
    'removeTitle',
    { name:'cleanupNumericValues', params: {floatPrecision: 2 }},
    { name:'convertColors', params: {currentColor: true }},
    { name:'removeViewBox', active: false},
    'removeDimensions'
  ]
}
