const bundles = {
  api: 'api',
  app: 'app',
};

const envs = {
  dev: 'development',
  prod: 'production',
  test: 'test',
};

const env = process.env.NODE_ENV;

const isDev = process.env.NODE_ENV === envs.dev;
const isProd = process.env.NODE_ENV === envs.prod;
const isTest = process.env.NODE_ENV === envs.test;

const notDev = !isDev;
const notProd = !isProd;
const notTest = !isTest;

let definedVars = bundle => {
  let vars;
  try {
    const dotenv = require('dotenv').config({ path: `${__dirname}/.env.${env}` });
    vars = Object.keys(dotenv.parsed).reduce((acc, key) => {
      if (bundle === bundles.api || !key.startsWith('_')) {
        acc[key.replace(/^_/, '')] = dotenv.parsed[key] !== '' ? dotenv.parsed[key] : process.env[key];
      }
      return acc;
    }, {});
  } catch (err) {
    vars = process.env;
  }

  return Object.keys(vars).reduce(
    (acc, key) => {
      if (bundle === bundles.api || !key.startsWith('_')) {
        key = key.replace(/^!/, '');
        acc['process.env'][key] = JSON.stringify(vars[key]);
      }
      return acc;
    },
    { 'process.env': {} }
  );
};

module.exports = {
  bundles,
  envs,
  env,
  isDev,
  isProd,
  isTest,
  notDev,
  notProd,
  notTest,
  definedVars,
};
