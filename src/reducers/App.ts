export interface IState {
  readonly message?: string;
}

export interface IAction extends IState {
  readonly type: string;
}

export const TYPES = {
  NEW_MESSAGE: 'NEW_MESSAGE',
};

export const _state: IState = {
  message: 'Welcome to Gravity Boilerplate!',
};

export const reducer = (state: IState = _state, action: IAction): IState => {
  switch (action.type) {
    case TYPES.NEW_MESSAGE:
      return {
        ...state,
        message: action.message,
      };

    default:
      return state;
  }
};
