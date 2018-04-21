export interface IState {
  readonly subscriptions?: Array<string>;
}

export interface IAction {
  readonly type: string;
  readonly channel?: string;
}

export const TYPES = {
  SUBSCRIBE: 'SUBSCRIBE',
  UNSUBSCRIBE: 'UNSUBSCRIBE',
  UNSUBSCRIBE_ALL: 'UNSUBSCRIBE_ALL',
};

export const _state: IState = {
  subscriptions: [],
};

const addSubscription = (subscriptions: Array<string> | undefined, channel: string | undefined) => {
  return [...(subscriptions || [])].concat(channel || []).filter((subscription, i, self) => {
    return self.indexOf(subscription) === i;
  });
};

const removeSubscription = (subscriptions: Array<string> | undefined, channel: string | undefined) => {
  return [...(subscriptions || [])].filter(subscription => {
    return subscription !== channel;
  });
};

export const reducer = (state: IState = _state, action: IAction): IState => {
  switch (action.type) {
    case TYPES.SUBSCRIBE:
      return {
        ...state,
        subscriptions: addSubscription(state.subscriptions, action.channel),
      };
    case TYPES.UNSUBSCRIBE:
      return {
        ...state,
        subscriptions: removeSubscription(state.subscriptions, action.channel),
      };
    case TYPES.UNSUBSCRIBE_ALL:
      return {
        ...state,
        subscriptions: [],
      };

    default:
      return state;
  }
};
