import { types } from 'reducers';
import { Store, Dispatch, states, actions } from 'reducers';
import { IMessage } from 'reducers/Chat';

export interface IActions {
  readonly newMessage: (message: IMessage) => Promise<actions.Chat>;
}

export const action = (dispatch: Dispatch<actions.Chat>, store: Store<states.Chat>): IActions => ({
  newMessage: async (message: IMessage): Promise<actions.Chat> => {
    return dispatch({
      type: types.Chat.NEW_MESSAGE,
      message,
    });
  },
});
