import * as knex from 'knex';
import * as env from 'env';
import * as config from 'db/config';

const environment = process.env.NODE_ENV || env.envs.development;

export class db {
  static knex: knex;
  static open = (): knex => (db.knex = knex(config[environment]));
  static close = () => db.knex.destroy();
  static query = async fn => {
    db.open();
    let response = await fn(db.knex);
    db.close();
    return response;
  };
}
