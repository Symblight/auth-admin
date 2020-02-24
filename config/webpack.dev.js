const merge = require('webpack-merge');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.common.js');
const devServerConfig = require('./webpack.server');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HardSourceWebpackPlugin(), new webpack.HotModuleReplacementPlugin()],
  devServer: devServerConfig,
});
