import { store } from 'utils/store';
import { Dispatch } from 'redux';

import * as Chat from 'actions/Chat';
import * as Events from 'actions/Events';

export interface IActions {
  readonly Actions: {
    readonly Chat: Chat.IActions;
    readonly Events: Events.IActions;
  };
}

export const actions = (dispatch: Dispatch<any>): IActions => ({
  Actions: {
    Chat: Chat.action(dispatch, store),
    Events: Events.action(dispatch, store),
  },
});
