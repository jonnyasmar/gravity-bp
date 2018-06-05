import { types, names } from 'reducers';
import { Store, Dispatch, IStates, IActions } from 'reducers';
import { Events, IEventSource } from 'services/Events';

export interface IActions {
  readonly subscribe: (channel: string, options: IEventSource) => IActions.Events;
  readonly unsubscribe: (channel: string) => IActions.Events;
  readonly unsubscribeAll: () => IActions.Events;
}

export const action = (dispatch: Dispatch<IActions.Events>, store: Store<IStates.Events>): IActions => ({
  subscribe: (channel: string, options: IEventSource): IActions.Events => {
    try {
      Events.subscribe(channel, options);
      return dispatch({
        type: types.Events.SUBSCRIBE,
        name: names.Events,
        channel,
      });
    } catch (err) {
      throw err;
    }
  },
  unsubscribe: (channel: string): IActions.Events => {
    try {
      Events.unsubscribe(channel);
      return dispatch({
        type: types.Events.UNSUBSCRIBE,
        name: names.Events,
        channel,
      });
    } catch (err) {
      throw err;
    }
  },
  unsubscribeAll: (): IActions.Events => {
    try {
      Events.unsubscribeAll();
      return dispatch({
        type: types.Events.UNSUBSCRIBE_ALL,
        name: names.Events,
      });
    } catch (err) {
      throw err;
    }
  },
});
