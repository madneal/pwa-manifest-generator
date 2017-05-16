const path = require('path')
const plugin = require('../index')

module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new plugin({
      name: 'test',
      description: 'test the plugin',
      icon: {
          src: path.resolve('example/icon.jpg'),
          sizes: [144, 192]
      }
    })
  ]
}
