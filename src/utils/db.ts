import * as knex from 'knex';
import * as env from 'env';
import * as config from 'db/config';

const environment = process.env.NODE_ENV || env.envs.development;

export class db {
  static open = (): knex => knex(config[environment]);
  static close = (connection: knex) => connection.destroy();
  static query = async fn => {
    let connection = db.open();
    let response = await fn(connection);
    db.close(connection);
    return response;
  };
}
