import { store } from 'utils/store';

import * as App from 'actions/App';
import * as Events from 'actions/Events';

export interface IActions {
  readonly _App: App.IActions;
  readonly _Events: Events.IActions;
}

export const actions = (dispatch: any): IActions => ({
  _App: App.actions(dispatch, store.getState),
  _Events: Events.actions(dispatch, store.getState),
});
