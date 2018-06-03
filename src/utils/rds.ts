import * as knex from 'knex';
import * as env from '../../env';

const environment = process.env.NODE_ENV || env.envs.development;

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
    stub: '../migrations/migration.stub',
    loadExtensions: ['.ts'],
    directory: '../migrations',
  },
};

export const config = { development };

export class rds {
  static open = (): knex => knex(config[environment]);
  static close = (connection: knex) => connection.destroy();
  static query = async fn => {
    let connection = rds.open();
    let response = await fn(connection);
    rds.close(connection);
    return response;
  };
}
