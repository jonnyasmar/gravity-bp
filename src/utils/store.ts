import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { combinedReducers } from '../reducers';

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'];
export default composeEnhancers(
  applyMiddleware(ReduxThunk),
)(createStore)(combinedReducers);