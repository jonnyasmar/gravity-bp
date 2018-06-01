import * as knex from 'knex';
import * as env from 'env';
import * as config from 'db/config';
import * as tables from 'db/tables';

const environment = process.env.NODE_ENV || env.envs.development;

export class db {
  static tables = tables;
  static open = (): knex => knex(config[environment]);
}
