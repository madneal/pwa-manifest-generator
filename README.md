# pwa-manifest-generator

This is utilized to generated `manifest.json` file for a progressive web application. And this is inspired by [pwa-manifest-webpack-plugin](https://github.com/easthing/pwa-manifest-webpack-plugin).

## Install

`npm install -g pwa-manifest-generator`

## Config 

```javascript
const pluginPwa = require('pwa-manifest-generator')

module.exports = {
  entry: path.resolve(__dirname, './main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new pluginPwa({
      name: 'test',
      description: 'test the plugin',
      icon: {
          src: path.resolve('example/icon.jpg'),
          sizes: [144, 192]
      }
    })
  ]
}

```

This will generate the `manifest.json` file:

```json
{
  "name": "pwa-manifest-generator",
  "version": "0.1.0",
  "description": "A webpack plugin to generate manifest.json file for a progressive web application.",
  "main": "index.js",
  "directories": {
    "example": "example"
  },
  "scripts": {
    "test": "webpack --config ./example/webpack.config.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/neal1991/pwa-manifest-generator.git"
  },
  "keywords": [
    "pwa",
    "webpack",
    "plugin"
  ],
  "author": "neal1991",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/neal1991/pwa-manifest-generator/issues"
  },
  "homepage": "https://github.com/neal1991/pwa-manifest-generator#readme",
  "dependencies": {
    "mime": "^1.3.6",
    "webpack": "^2.5.1"
  }
}
```

You can access the example folder for an example. In the example folder, there is a `webpack.config.js`，you can run `npm run test` to generate the `manifest.json` file.

## LICENSE

[MIT](https://github.com/neal1991/pwa-manifest-generator/blob/master/LICENSE)