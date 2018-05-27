import { combineReducers } from 'redux';

import * as Chat from 'reducers/Chat';
import * as Events from 'reducers/Events';
import { IActions } from 'actions';
import { name } from 'utils/redux';

export { Store } from 'redux';
export { connected } from 'utils/redux';

export interface INamed {
  name?: string;
}
export interface IStore<T = {}> {
  readonly history?: any;
  readonly Store: IReducers;
  readonly Selectors: T;
}

export type Dispatch<T> = (action: T & INamed) => any;
export type ISelectors = (
  state: IReducers
) => {
  [key: string]: any;
};
export type IProps<T = {}> = IActions & IStore<T>;

export namespace states {
  export type Chat = Chat.IState;
  export type Events = Events.IState;
}

export namespace actions {
  export type Chat = Chat.IAction;
  export type Events = Events.IAction;
}

export interface IReducers {
  readonly Chat: Chat.IState;
  readonly Events: Events.IState;
}

export const props = (selectors?: ISelectors) => {
  return (state: IReducers): Partial<IStore<IReducers>> => {
    if (selectors) {
      return {
        Selectors: selectors(state),
      } as Partial<IStore<IReducers>>;
    } else {
      return {
        Store: {
          Chat: state.Chat,
          Events: state.Events,
        },
      };
    }
  };
};

export const types = {
  Chat: Chat.types,
  Events: Events.types,
};

export const combinedReducers = combineReducers({
  Chat: name(Chat.reducer),
  Events: name(Events.reducer),
});
