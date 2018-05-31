const tables = require('../tables/index');
const CHAT = tables.CHAT;

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable(CHAT.name, function(table) {
      table.increments();
      table.string(CHAT.columns.message);
      table.string(CHAT.columns.user);
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([knex.schema.dropTable(CHAT.name)]);
};
