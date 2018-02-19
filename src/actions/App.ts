import * as TYPES from '../utils/types';
import * as services from '../services';

export interface IActions{
  readonly newMessage: () => void;
}

export const actions = (dispatch: any, store: any): IActions => ({
  newMessage: async (): Promise<any> =>{
    let message: services.Messages.IMessage;
    do message = await services.request(services.url('messages'));
    while(message.id === store.getState().App.lastMessageId);

    return dispatch({
      type: TYPES.App.NEW_MESSAGE,
      lastMessageId: message.id,
      message: message.text,
    });
  }
});