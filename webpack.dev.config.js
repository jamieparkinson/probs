var webpack = require('webpack');
var path = require('path');

var config = {
  devtool: 'eval',

  entry: './index.jsx',

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: __dirname,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', 'jsx']
  }
};

module.exports = config;
