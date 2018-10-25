const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: { ahem: './ahem.js' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'none',
  node: {
    __dirname: true
  },
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [/node_modules/],
  output: {
    path: path.join(__dirname, 'dist-backend'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
  ]
};
