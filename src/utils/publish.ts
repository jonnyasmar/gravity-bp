import * as grip from 'grip';
import * as faas_grip from 'faas-grip';

import { Dispatch } from 'redux';
import { IAllActions, actions } from 'actions';
import { IDispatch } from 'reducers';

export const publish = (channel: string, body: Object) => {
  let message = new grip.HttpStreamFormat(`event: message\ndata: ${JSON.stringify(body)} \n\n`);
  return new Promise(resolve => faas_grip.publish(channel, message, resolve));
};

export const process = (source: any, action: Array<string>): Function => {
  if (action) return action.reduce((fn: Function, action: string) => fn[action], source);
  else return source;
};

type Arrayify<T> = { [P in keyof T]: string[] };
type ActionsEnum = { [P in keyof IAllActions]: Arrayify<IAllActions[P]> };

const dispatch: Dispatch<IDispatch> = (action: IDispatch): any => undefined;
const ActionTypes = actions(dispatch).Actions;
export const pubActions: ActionsEnum = Object.keys(ActionTypes).reduce(
  (acc, name) => {
    let methods = Object.keys(ActionTypes[name]);
    if (!acc[name]) acc[name] = {};
    methods.forEach(method => (acc[name][method] = [name, method]));
    return acc;
  },
  {} as ActionsEnum
);
