import { IActions, Dispatch, IStates, Store, types } from 'reducers';
import { IMessage, IMessageCreate, IMessageBody, IMessageUpdate } from 'models/Message';
import { request } from 'utils/request';

export interface IActions {
  readonly createMessage: (message: IMessageBody, publish?: boolean) => Promise<void>;
  readonly readMessages: (id?: number) => Promise<void>;
  readonly updateMessage: (message: IMessageUpdate, publish?: boolean) => Promise<void>;
  readonly deleteMessage: (id: number, publish?: boolean) => Promise<void>;
}

const name = 'Chat';

export const action = (dispatch: Dispatch<IActions.Chat>, store: Store<IStates.Chat>): IActions => ({
  createMessage: async (message: IMessageCreate, publish?: boolean): Promise<void> => {
    try {
      if (publish)
        await request('chat/messages/create', {
          method: 'POST',
          data: message,
        });
      else
        dispatch({
          type: types.Chat.CREATE,
          name,
          item: message,
        });
    } catch (err) {
      console.error(err);
    }
  },
  readMessages: async (id?: number): Promise<void> => {
    try {
      let messages = await request(`chat/messages/read${id ? `/${id}` : ''}`, {
        method: 'GET',
      });

      dispatch({
        type: types.Chat.READ,
        name,
        items: messages,
      });
    } catch (err) {
      console.error(err);
    }
  },
  updateMessage: async (message: IMessageUpdate, publish?: boolean): Promise<void> => {
    try {
      if (publish) {
        await request(`chat/messages/update`, {
          method: 'PATCH',
          data: message,
        });
      } else {
        dispatch({
          type: types.Chat.UPDATE,
          name,
          item: message as IMessage,
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
  deleteMessage: async (id: number, publish?: boolean): Promise<void> => {
    try {
      if (publish)
        await request('chat/messages/delete', {
          method: 'DELETE',
          data: { id },
        });
      else
        dispatch({
          type: types.Chat.DELETE,
          name,
          id,
        });
    } catch (err) {
      console.error(err);
    }
  },
});
