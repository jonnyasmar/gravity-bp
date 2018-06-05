import { combineReducers } from 'redux';
import { named } from 'utils/redux';
import { IDispatch } from 'reducers';
import { IMessage } from 'models/Message';
import * as Data from 'reducers/_Data';
import { IMessageActions } from 'models/Message';

const name = 'Chat';

interface IState extends Data.IState<IMessageActions> {}

interface IReducer extends IState {
  data: Data.IState<IMessage>;
}

interface IAction extends IDispatch, Data.IAction<IMessageActions> {}

const types = {
  ...Data.types,
};

const initialState = {
  items: [],
};

const reducer = combineReducers({
  data: named(Data.reducer, name),
});

// Required Exports
export { IState, IReducer, IAction, types, initialState, reducer };
