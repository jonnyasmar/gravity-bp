import * as env from 'env';

export const development = {
  client: 'pg',
  connection: {
    host: env.vars.RDS_HOST,
    port: env.vars.RDS_PORT,
    database: env.vars.RDS_DB,
    user: env.vars.RDS_USER,
    password: env.vars.RDS_PASSWORD,
  },
  migrations: {
    stub: 'migration.stub',
    loadExtensions: ['.ts'],
  },
};
