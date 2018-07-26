import * as pg from 'pg';
import * as knex from 'knex';
import * as env from '../../env';

const db = pg;

const environment = process.env.NODE_ENV || env.envs.development;

export const development = {
  client: 'pg',
  connection: {
    host: process.env.RDS_HOST,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
  },
  migrations: {
    stub: '../migrations/migration.stub',
    loadExtensions: ['.ts'],
    directory: '../migrations',
  },
};

export const config = { development, production: development };

export class rds {
  static open = (): knex => knex(config[environment]);
  static close = (connection: knex) => connection.destroy();
  static query = async fn => {
    try {
      let connection: knex = rds.open();
      let response = await fn(connection);
      rds.close(connection);
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  };
}
