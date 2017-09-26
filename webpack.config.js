const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');

const hotMiddlewareScript = 'webpack-hot-middleware/client?name=bundle';


const PATHS = {
  app: path.join(__dirname, 'src', 'index.jsx'),
  build: path.join(__dirname, 'dist'),
};

const config = {
  entry: {
    // Add the client which connects to our middleware
    client: ['babel-polyfill', PATHS.app, hotMiddlewareScript],
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/assets/scripts/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: path.join(__dirname, '.eslintrc'),
        },
      },
    ],
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

// module.exports = merge(config, commonConfig)
module.exports = config;