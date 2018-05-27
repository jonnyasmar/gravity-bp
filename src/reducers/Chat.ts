export interface IMessage {
  text?: string;
  user?: string;
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
    },
  ],
};

const reducer = (state: IState = initialState, action: IAction): IState => {
  const actions = {
    [types.NEW_MESSAGE]: () => {
      return {
        ...state,
        messages: [...state.messages, action.message || {}],
      };
    },
  };

  return actions.hasOwnProperty(action.type) ? actions[action.type]() : state;
};

// Required Exports
export { IState, IAction, types, initialState, reducer };
