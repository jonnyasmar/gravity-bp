const envs = {
  dev: 'development',
  prod: 'production',
};

const env = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV === envs.dev;
const isProd = process.env.NODE_ENV === envs.prod;

const dotenv = require('dotenv').config({ path: `${__dirname}/.env.${env}` });

module.exports = {
  envs,
  env,
  isDev,
  isProd,
  vars: dotenv.parsed,
};
