const grip = require('grip');
const faas_grip = require('faas-grip');

export const publish = (channel: string, body: Object) => {
  let message = new grip.HttpStreamFormat(`event: message\ndata: ${JSON.stringify(body)} \n\n`);
  return new Promise(resolve => {
    faas_grip.publish(channel, message, () => {
      resolve();
    });
  });
};
