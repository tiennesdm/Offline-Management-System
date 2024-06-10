const { merge } = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

/**
 * Development Webpack configuration.
 * @type {import('webpack').Configuration}
 */
module.exports = merge(common, {
  /**
   * Mode configuration.
   * @type {string}
   */
  mode: 'development',

  /**
   * Source map configuration.
   * @type {string | boolean}
   */
  devtool: 'source-map',

  /**
   * Configuration for the webpack-dev-server.
   * @type {import('webpack-dev-server').Configuration}
   */
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    open: true,
    historyApiFallback: true,
    hot: true,
  },

  /**
   * Plugins used in the build process.
   * @type {import('webpack').WebpackPluginInstance[]}
   */
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});
