import { combineReducers } from 'redux';
import { IActions } from 'actions';
import { named } from 'utils/redux';

import * as __MODULE__ from 'reducers/__MODULE__';
import * as Chat from 'reducers/Chat';
import * as Events from 'reducers/Events';

export { Store } from 'redux';
export { connected } from 'utils/redux';

export interface IDispatch {
  name?: string;
  type: string;
}
export interface IStore<T = {}> {
  readonly history?: any;
  readonly Selectors: T;
  readonly Store: IReducers;
}

export type Dispatch<T> = (action: T & IDispatch) => any;
export type ISelectors = (
  state: IReducers
) => {
  [key: string]: any;
};
export type IProps<T = {}> = IActions & IStore<T>;

export namespace IStates {
  export type __MODULE__ = __MODULE__.IState;
  export type Chat = Chat.IState;
  export type Events = Events.IState;
}

export namespace IActions {
  export type __MODULE__ = __MODULE__.IAction;
  export type Chat = Chat.IAction;
  export type Events = Events.IAction;
}

export interface IReducers {
  readonly __MODULE__: __MODULE__.IReducer;
  readonly Chat: Chat.IReducer;
  readonly Events: Events.IReducer;
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
          __MODULE__: state.__MODULE__,
          Chat: state.Chat,
          Events: state.Events,
        },
      };
    }
  };
};

export const types = {
  __MODULE__: __MODULE__.types,
  Chat: Chat.types,
  Events: Events.types,
};

export const combinedReducers = combineReducers({
  __MODULE__: named(__MODULE__.reducer),
  Chat: named(Chat.reducer, 'Chat'),
  Events: named(Events.reducer),
});
