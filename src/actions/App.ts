import * as TYPES from 'utils/types';
import * as services from 'services/index';

export interface IActions {
  readonly newMessage: () => any;
}

export const actions = (dispatch: any, store: any): IActions => ({
  newMessage: async (): Promise<any> => {
    let message: services.Messages.IMessage;
    message = await services.request(services.url(`messages/${store().App.lastMessageId}`));

    return dispatch({
      type: TYPES.App.NEW_MESSAGE,
      lastMessageId: message.id,
      message: message.text,
    });
  },
});
