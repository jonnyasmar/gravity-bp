import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { combinedReducers } from 'reducers';

const hasDevTools = window && (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];

const composeEnhancers: any = hasDevTools ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] : compose;
export const store = composeEnhancers(applyMiddleware(ReduxThunk))(createStore)(combinedReducers);
