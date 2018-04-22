const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: __dirname + '/test/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'test for programmatical event',
      filename: 'index.html',
      template: __dirname + '/test/index.tmpl.html'
    })
  ]
};
