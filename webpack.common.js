const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack'); 

/**
 * Common Webpack configuration.
 * @type {import('webpack').Configuration}
 */
module.exports = {
  /**
   * The entry point for the application.
   * @type {string}
   */
  entry: './src/index.tsx',

  /**
   * Options for the output of the build process.
   * @type {import('webpack').Output}
   */
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  /**
   * Configuration for resolving module requests.
   * @type {import('webpack').ResolveOptions}
   */
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },

  /**
   * Module configuration for how different file types should be handled.
   * @type {import('webpack').ModuleOptions}
   */
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

  /**
   * Plugins used in the build process.
   * @type {import('webpack').WebpackPluginInstance[]}
   */
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Dotenv(), 
  ],
};
