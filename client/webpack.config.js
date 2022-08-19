const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();

module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    filename: 'ecommerce.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    symlinks: false,
  },
  devServer: {
    https: true,
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.m?(js|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './css', to: './css', toType: 'dir' }],
    }),
    new webpack.EnvironmentPlugin([
      'BACKEND_API_BASE_URL',
      'COMMERCE_JS_PUBLIC_KEY',
    ]),
  ],
};
