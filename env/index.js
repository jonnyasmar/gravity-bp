const envs = {
  dev: 'development',
  prod: 'production',
  test: 'test',
};

const index = process.env.NODE_ENV;

const isDev = process.env.NODE_ENV === envs.dev;
const isProd = process.env.NODE_ENV === envs.prod;
const isTest = process.env.NODE_ENV === envs.test;

const notDev = !isDev;
const notProd = !isProd;
const notTest = !isTest;

let vars;
try {
  const dotenv = require('dotenv').config({ path: `${__dirname}/.env.${index}` });
  vars = Object.keys(dotenv.parsed).reduce((acc, key) => {
    acc[key] = dotenv.parsed[key] !== '' ? dotenv.parsed[key] : process.env[key];
    return acc;
  }, {});
} catch (err) {
  vars = process.env;
}

let definedVars = Object.keys(vars).reduce(
  (acc, key) => {
    acc['process.env'][key] = JSON.stringify(vars[key]);
    return acc;
  },
  { 'process.env': {} }
);

module.exports = {
  envs,
  env: index,
  isDev,
  isProd,
  isTest,
  notDev,
  notProd,
  notTest,
  vars,
  definedVars,
};
