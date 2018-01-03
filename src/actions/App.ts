import * as TYPES from '../utils/types';
import * as services from '../services';

export interface IActions{
  readonly newMessage: () => void;
}

export const actions = (dispatch: any): IActions => ({
  newMessage: () => dispatch({
    type: TYPES.App.NEW_MESSAGE,
    message: services.Messages.getNewMessage()
  }),
});