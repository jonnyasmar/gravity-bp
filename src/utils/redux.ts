import { actions, IActions } from '../actions';
import { IReducers, props } from '../reducers';
const {connect} = require('react-redux');

export interface IProps extends IActions, IReducers{}

export const connected: any = connect(props, actions);