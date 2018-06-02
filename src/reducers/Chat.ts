import { IDispatch } from 'reducers';

interface IState<T> {
  readonly items: Array<T & { id?: number }>;
}

interface IAction<T> extends IDispatch {
  readonly item?: T & { id?: number };
  readonly items?: Array<T & { id?: number }>;
  readonly id?: number;
}

const types = {
  CREATE: 'CREATE',
  READ: 'READ',
  READ_ALL: 'READ_ALL',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
};

const initialState = {
  items: [],
};

const reducer = <T>(state: IState<T> = initialState, action: IAction<T>): IState<T> => {
  const actions = {
    [types.CREATE]: (): IState<T> => {
      return {
        ...state,
        items: [...state.items, action.item || initialState.items[0]],
      };
    },
    [types.READ]: (): IState<T> => {
      return {
        ...state,
        items: action.items || initialState.items,
      };
    },
    [types.UPDATE]: (): IState<T> => {
      return {
        ...state,
        items: state.items.map(item => {
          if (action.item && item.id === action.item.id) item = action.item;
          return item;
        }),
      };
    },
    [types.DELETE]: (): IState<T> => {
      let newState = { ...state };
      newState.items = state.items.filter(item => item.id !== action.id);
      return newState;
    },
  };

  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

// Required Exports
export { IState, IAction, types, initialState, reducer };
