import * as React from 'react';
import { actions } from 'actions';
import { ISelectors, props } from 'reducers';
import { withRouter } from 'react-router-dom';
const { connect } = require('react-redux');

const withoutRouter: any = (fn: any) => {
  return fn;
};

export interface IConnect {
  selectors?: ISelectors;
  store?: boolean;
  routed?: boolean;
}

export const connected: any = (component: React.Component, options?: IConnect) => {
  let route = options && options.routed !== false ? withRouter : withoutRouter;
  let state = options && options.selectors ? props(options.selectors) : options && options.store ? props() : null;

  return route(
    connect(
      state,
      actions
    )(component)
  );
};

export const named = (reducer: any, namespace: string | undefined = undefined) => {
  return (state, action) => {
    if (action.name !== namespace && state !== undefined) return state;
    return reducer(state, action);
  };
};

export const namespace = (namespace: string, types: any) => {
  Object.keys(types).forEach((type: string) => {
    types[type] = `${namespace}/${type}`;
  });

  return types;
};
