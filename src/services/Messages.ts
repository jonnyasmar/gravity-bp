import { Callback, Context, Handler } from 'aws-lambda';

export namespace Messages{
  export interface IResponse{
    statusCode: number;
    body: string;
  }

  export interface IMessage{
    id: number;
    text: string;
  }

  export class main{
    public static messages: ReadonlyArray<string> = [
      'Welcome!',
      'Welcome to Gravity Boilerplate!',
      'Thanks for stopping by!',
      'Because React/Redux...',
      'Because TypeScript...',
      'Because Webpack...',
      'Because Express...'
    ];

    public static getNewMessage(): IMessage{
      let messageId = Math.round(Math.random() * (this.messages.length - 1));
      return {
        id: messageId,
        text: this.messages[messageId]
      }
    };
  }
}

export const handler: Handler = (event: any, context: Context, callback: Callback) =>{
  let message = Messages.main.getNewMessage();
  const response: Messages.IResponse = {
    statusCode: 200,
    body: JSON.stringify(message)
  };

  callback(undefined, response);
};