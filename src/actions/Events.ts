import { TYPES } from 'reducers';
import { Events, IEventSource } from 'services/Events';

export interface IActions {
  readonly subscribe: (channel: string, options: IEventSource) => any;
  readonly unsubscribe: (channel: string) => any;
  readonly unsubscribeAll: () => any;
}

export const actions = (dispatch: any, store: any): IActions => ({
  subscribe: (channel: string, options: IEventSource): void => {
    try {
      Events.subscribe(channel, options);
      return dispatch({
        type: TYPES.Events.SUBSCRIBE,
        channel,
      });
    } catch (err) {
      throw err;
    }
  },
  unsubscribe: (channel: string): void => {
    try {
      Events.unsubscribe(channel);
      return dispatch({
        type: TYPES.Events.UNSUBSCRIBE,
        channel,
      });
    } catch (err) {
      throw err;
    }
  },
  unsubscribeAll: (): void => {
    try {
      Events.unsubscribeAll();
      return dispatch({ type: TYPES.Events.UNSUBSCRIBE_ALL });
    } catch (err) {
      throw err;
    }
  },
});
