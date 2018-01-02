import * as types from '../utils/types';
import * as services from '../services';

export interface IActions{
  readonly newMessage: () => void;
}

export const actions = (dispatch: any): IActions => ({
  newMessage: () => dispatch({
    type: types.App.NEW_MESSAGE,
    message: services.Messages.getNewMessage()
  }),
});