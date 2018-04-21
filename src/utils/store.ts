import { applyMiddleware, compose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { combinedReducers } from 'reducers';

const composeEnhancers: any = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
export const store: any = composeEnhancers(applyMiddleware(ReduxThunk))(createStore)(combinedReducers);
