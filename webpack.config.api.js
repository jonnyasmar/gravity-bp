const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const merge = require('webpack-merge');
const common = require('./webpack.config.common');
const env = require('./env');

const bundle = env.bundles.api;

const config = {
  [env.envs.dev]: {
    watch: true,
  },
  [env.envs.prod]: {},
  all: {
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
      globalObject: 'this',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CleanWebpackPlugin(['api'], {
        //watch: true,
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.ProvidePlugin({
        window: 'src/utils/window.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader?useBabel=true&useCache=true',
        },
      ],
    },
    externals: [nodeExternals()],
  },
};

module.exports = merge(common(bundle), config.all, config[env.env]);
