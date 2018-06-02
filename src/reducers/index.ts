import { combineReducers } from 'redux';
import { IActions } from 'actions';
import { name } from 'utils/redux';

import * as __MODULE__ from 'reducers/__MODULE__';
import * as Item from 'reducers/Item';
import * as Events from 'reducers/Events';
import { IMessage, IMessageActions } from 'models/Message';

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

export namespace states {
  export type __MODULE__ = __MODULE__.IState;
  export type Chat = Item.IState<IMessageActions>;
  export type Events = Events.IState;
}

export namespace actions {
  export type __MODULE__ = __MODULE__.IAction;
  export type Chat = Item.IAction<IMessageActions>;
  export type Events = Events.IAction;
}

export interface IReducers {
  readonly __MODULE__: __MODULE__.IState;
  readonly Chat: Item.IState<IMessage>;
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
  Chat: Item.types,
  Events: Events.types,
};

export const combinedReducers = combineReducers({
  __MODULE__: name(__MODULE__.reducer),
  Chat: name(Item.reducer, 'Chat'),
  Events: name(Events.reducer),
});
