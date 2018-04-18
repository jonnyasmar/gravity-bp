import { combineReducers } from 'redux';
import * as App from 'reducers/App';

export interface IReducers {
  readonly history?: any;
  readonly App: App.IState;
}

export const props = (state: IReducers): IReducers => ({
  App: state.App,
});

export const combinedReducers = combineReducers({
  App: App.reducers,
});
