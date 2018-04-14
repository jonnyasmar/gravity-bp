export interface IState {
  readonly lastMessageId?: number;
  readonly message?: string;
}

export interface IAction extends IState {
  readonly type: string;
}

export const TYPES = {
  NEW_MESSAGE: 'NEW_MESSAGE',
};

export const _state: IState = {
  lastMessageId: -1,
  message: '',
};

export const reducers = (state: IState = _state, action: IAction): IState => {
  switch (action.type) {
    case TYPES.NEW_MESSAGE:
      return {
        ...state,
        lastMessageId: action.lastMessageId,
        message: action.message,
      };

    default:
      return state;
  }
};
