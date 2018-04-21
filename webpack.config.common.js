const path = require('path');
const Dotenv = require('dotenv-webpack');
const merge = require('webpack-merge');
const env = require('./env');

const config = {
  [env.envs.dev]: {
    plugins: [
      new Dotenv({
        path: './.env.local',
      }),
    ],
  },
  [env.envs.prod]: {
    plugins: [
      new Dotenv({
        path: './.env.prod',
      }),
    ],
  },
  all: {
    resolve: {
      alias: {
        api: path.resolve(__dirname, 'src/api'),
        actions: path.resolve(__dirname, 'src/actions'),
        components: path.resolve(__dirname, 'src/components'),
        reducers: path.resolve(__dirname, 'src/reducers'),
        services: path.resolve(__dirname, 'src/services'),
        styles: path.resolve(__dirname, 'src/styles'),
        utils: path.resolve(__dirname, 'src/utils'),
        views: path.resolve(__dirname, 'src/views'),
      },
    },
  },
};

module.exports = merge(config.all, config[env.env]);
