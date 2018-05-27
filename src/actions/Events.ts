import { types } from 'reducers';
import { Store, Dispatch, states, actions } from 'reducers';
import { Events, IEventSource } from 'services/Events';

export interface IActions {
  readonly subscribe: (channel: string, options: IEventSource) => actions.Events;
  readonly unsubscribe: (channel: string) => actions.Events;
  readonly unsubscribeAll: () => actions.Events;
}

export const action = (dispatch: Dispatch<actions.Events>, store: Store<states.Events>): IActions => ({
  subscribe: (channel: string, options: IEventSource): actions.Events => {
    try {
      Events.subscribe(channel, options);
      return dispatch({
        type: types.Events.SUBSCRIBE,
        channel,
      });
    } catch (err) {
      throw err;
    }
  },
  unsubscribe: (channel: string): actions.Events => {
    try {
      Events.unsubscribe(channel);
      return dispatch({
        type: types.Events.UNSUBSCRIBE,
        channel,
      });
    } catch (err) {
      throw err;
    }
  },
  unsubscribeAll: (): actions.Events => {
    try {
      Events.unsubscribeAll();
      return dispatch({ type: types.Events.UNSUBSCRIBE_ALL });
    } catch (err) {
      throw err;
    }
  },
});
