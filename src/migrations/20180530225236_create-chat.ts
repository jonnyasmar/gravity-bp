import { CHAT } from '../tables';

exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable(CHAT.name, table => {
      table.increments();
      table.string(CHAT.columns.text);
      table.string(CHAT.columns.user);
      table.timestamps();
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([knex.schema.dropTable(CHAT.name)]);
};
