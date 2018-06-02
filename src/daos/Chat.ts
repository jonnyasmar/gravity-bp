import { db } from 'utils/db';
import { IMessage } from 'models/Message';
import { CHAT } from 'db/tables';

interface IWhere {
  id?: number;
}

export class Chat {
  static create = async (message: Partial<IMessage>) => {
    return await db.query(knex =>
      knex(CHAT.name)
        .insert(message)
        .returning('*')
    );
  };
  static read = async (id?: number) => {
    let where: IWhere = {};
    if (id) where.id = id;
    return await db.query(knex =>
      knex(CHAT.name)
        .select('*')
        .where(where)
        .orderBy('created_at')
    );
  };
  static update = async (message: Partial<IMessage>) => {
    let where: IWhere = { id: message.id };
    return await db.query(knex =>
      knex(CHAT.name)
        .where(where)
        .update(message)
        .returning('*')
    );
  };
  static delete = async (id: number) => {
    return await db.query(knex =>
      knex(CHAT.name)
        .where('id', id)
        .delete()
    );
  };
}
