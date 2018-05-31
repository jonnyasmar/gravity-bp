const path = require('path');
const webpack = require('webpack');
const env = require('./env');

const config = {
  plugins: [new webpack.DefinePlugin(env.definedVars)],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      actions: path.resolve(__dirname, 'src/actions'),
      components: path.resolve(__dirname, 'src/components'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      root: path.resolve(__dirname),
      selectors: path.resolve(__dirname, 'src/selectors'),
      services: path.resolve(__dirname, 'src/services'),
      src: path.resolve(__dirname, 'src'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils'),
      views: path.resolve(__dirname, 'src/views'),
    },
  },
  watchOptions: {
    ignored: [/^api/, /^public/, /^node_modules/],
  },
};

module.exports = config;
