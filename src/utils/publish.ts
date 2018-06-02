const grip = require('grip');
const faas_grip = require('faas-grip');

export const publish = (channel: string, body: Object) => {
  let message = new grip.HttpStreamFormat(`event: message\ndata: ${JSON.stringify(body)} \n\n`);
  return new Promise(resolve => faas_grip.publish(channel, message, resolve));
};

export const process = (source: any, actions: Array<string>): Function => {
  if (actions) return actions.reduce((fn: Function, action: string) => fn[action], source);
  else return source;
};
