const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-build-notifier');
const baseConfig = require('./webpack.config.base.js');
const merge = require('webpack-merge');
const outputDir = path.join(__dirname, 'build');
const host = 'localhost';
const port = 3000;

const ENV = process.env.NODE_ENV || 'development';
module.exports = merge.smart(baseConfig, {
  mode: 'development',
  entry: [
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],

  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },

  devtool: 'cheap-module-source-map',
  devServer: {
    host,
    port,
    disableHostCheck: true,
    contentBase: outputDir,
    compress: true,
    historyApiFallback: true,
    stats: {
      chunks: true,
    },
    hot: true,
    inline: true,
    lazy: false
  },

  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        include: __dirname,
      },
      {
        test: /^((?!\.global).)*\.less/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          'less-loader',
          'postcss-loader'

        ]
      },
      {
        test: /\.global\.less/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        test: /(\.css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
        ]
      }
    ]
  },

  plugins: [
    new WebpackNotifierPlugin({
      title: 'ProtectWeb',
      sound: false,
      suppressSuccess: true,
    }),
    new webpack.NamedModulesPlugin()
  ]
});
