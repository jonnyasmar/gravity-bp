import * as TYPES from 'utils/types';
import { request } from 'utils/request';
import * as api from 'api';

export interface IActions {
  readonly newMessage: () => any;
  readonly setMessage: (message: string) => any;
}

export const actions = (dispatch: any, store: any): IActions => ({
  newMessage: async (): Promise<any> => {
    let message: api.Messages.IMessage;
    message = await request(`messages/${store().App.lastMessageId}`);

    return dispatch({
      type: TYPES.App.NEW_MESSAGE,
      lastMessageId: message.id,
      message: message.text,
    });
  },
  setMessage: async (message: string): Promise<any> => {
    return dispatch({
      type: TYPES.App.NEW_MESSAGE,
      lastMessageId: 0,
      message: message,
    });
  },
});
