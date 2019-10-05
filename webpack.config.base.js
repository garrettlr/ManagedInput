// Base webpack config.
// Contains all common configurations between various builds.

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.(jpg|svg|png)$/,
        loader: 'file-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(ENV) },
      BODYMOVIN_EXPRESSION_SUPPORT: true
    }),

    new HtmlWebpackPlugin({
      // hash: true,
      inject: true,
      template: 'src/index.html'
    }),

  ]
};
