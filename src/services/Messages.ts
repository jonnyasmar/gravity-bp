import { Callback, Context, Handler } from 'aws-lambda';

export namespace Messages {
  export interface IResponse {
    statusCode: number;
    body: string;
  }

  export interface IMessage {
    id: number;
    text: string;
  }

  export class main {
    public static messages: ReadonlyArray<string> = [
      'Welcome!',
      'Welcome to Gravity Boilerplate!',
      'Thanks for stopping by!',
      'Because React/Redux...',
      'Because TypeScript...',
      'Because Webpack...',
      'Because Express...',
      'Because Serverless...',
    ];

    public static getNewMessage(): IMessage {
      let id = Math.round(Math.random() * (this.messages.length - 1));
      let text = this.messages[id];
      return { id, text };
    }
  }
}

export const handler: Handler = (event: any, context: Context, callback: Callback) => {
  let message = Messages.main.getNewMessage();
  const response: Messages.IResponse = {
    statusCode: 200,
    body: JSON.stringify(message),
  };

  callback(undefined, response);
};
