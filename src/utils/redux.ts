import * as React from 'react';
import { actions, IActions } from 'actions';
import { IReducers, props } from 'reducers';
import { withRouter } from 'react-router-dom';
const { connect } = require('react-redux');

export interface IProps extends IActions, IReducers {}

let withoutRouter: any = (fn: any) => {
  return fn;
};
export const connected: any = (component: React.Component, routed: boolean = true) => {
  return (routed ? withRouter : withoutRouter)(connect(props, actions)(component));
};
