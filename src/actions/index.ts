import { store } from 'utils/store';
import { Dispatch } from 'redux';

import * as __MODULE__ from 'actions/__MODULE__';
import * as Chat from 'actions/Chat';
import * as Events from 'actions/Events';

export interface IActions {
  readonly Actions: {
    readonly __MODULE__: __MODULE__.IActions;
    readonly Chat: Chat.IActions;
    readonly Events: Events.IActions;
  };
}

export const actions = (dispatch: Dispatch<any>): IActions => ({
  Actions: {
    __MODULE__: __MODULE__.action(dispatch, store),
    Chat: Chat.action(dispatch, store),
    Events: Events.action(dispatch, store),
  },
});
