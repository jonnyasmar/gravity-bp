import { getCurrentUTC } from 'utils/time';

export interface IMessage {
  text: string;
  user: string;
  created_at: string;
  updated_at: string;
}

interface IState {
  readonly messages: Array<IMessage>;
}

interface IAction {
  readonly type: string;
  readonly message?: IMessage;
}

const types = {
  NEW_MESSAGE: 'NEW_MESSAGE',
};

const initialState: IState = {
  messages: [
    {
      text: 'Welcome to Gravity Boilerplate!',
      user: 'GBP',
      created_at: getCurrentUTC(),
      updated_at: getCurrentUTC(),
    },
  ],
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  const actions = {
    [types.NEW_MESSAGE]: (): IState => {
      return {
        ...state,
        messages: [...state.messages, action.message || initialState.messages[0]],
      };
    },
  };

  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

// Required Exports
export { IState, IAction, types, initialState, reducer };
