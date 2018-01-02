import * as App from './App';

export interface IActions{
  readonly _App?: App.IActions
}

export const actions = (dispatch: any) => ({
  _App: App.actions(dispatch)
});