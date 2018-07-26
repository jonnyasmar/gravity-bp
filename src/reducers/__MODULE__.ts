const name = '__MODULE__';

export interface IData {
  value?: string;
}

interface IReducer extends IState {}

interface IState {
  readonly data: IData[];
}

interface IAction {
  readonly type: string;
  readonly data?: IData[];
}

const types = {
  ACTION: 'ACTION',
};

const initialState: IState = {
  data: [],
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  const actions = {
    [types.ACTION]: () => {
      return {
        ...state,
        data: action.data || [],
      };
    },
  };

  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

// Required Exports
export { name, IState, IReducer, IAction, types, initialState, reducer };
