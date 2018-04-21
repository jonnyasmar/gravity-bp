const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');

const config = {
  cache: true,
  entry: {
    index: './src/api/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'api'),
    publicPath: '',
    library: '[name]',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(['api'], {
      watch: true,
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  externals: [nodeExternals()],
  watchOptions: {
    ignored: [/api/, /public/, /node_modules/],
  },
};

module.exports = merge(common, config);
