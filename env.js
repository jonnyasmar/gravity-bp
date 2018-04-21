const envs = {
  dev: 'development',
  prod: 'production',
};

const env = process.env.NODE_ENV;
const isDev = process.env.NODE_ENV === envs.dev;
const isProd = process.env.NODE_ENV === envs.prod;

module.exports = {
  envs,
  env,
  isDev,
  isProd,
};
