import { combineReducers } from 'redux';
import * as App from 'reducers/App';
import * as Events from 'reducers/Events';

export interface IReducers {
  readonly history?: any;
  readonly App: App.IState;
  readonly Events: Events.IState;
}

export const props = (state: IReducers): IReducers => ({
  App: state.App,
  Events: state.Events,
});

export const combinedReducers = combineReducers({
  App: App.reducer,
  Events: Events.reducer,
});
