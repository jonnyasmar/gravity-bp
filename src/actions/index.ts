import { store } from '../utils/store';

import * as App from './App';

export interface IActions {
  readonly _App: App.IActions;
}

export const actions = (dispatch: any): IActions => ({
  _App: App.actions(dispatch, store),
});
