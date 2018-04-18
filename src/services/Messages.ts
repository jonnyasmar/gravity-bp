import * as AWS from 'aws-sdk';
import * as uuid from 'node-uuid';
import { Callback, Context, Handler } from 'aws-lambda';

import { Req, Get, Controller, Param } from '@nestjs/common';
import { message } from 'aws-sdk/clients/sns';

export namespace Messages {
  export interface IResponse {
    headers: object;
    statusCode: number;
    body: string;
  }

  export interface IMessage {
    id: number;
    text: string;
  }

  @Controller('messages')
  export class main {
    @Get('send/:message')
    async sendMessage(@Param() params) {
      let grip = require('grip');
      let faas_grip = require('faas-grip');

      let body = JSON.stringify({
        id: Math.random().toString(),
        text: params.message,
      });

      try {
        let message = new grip.HttpStreamFormat('event: message\ndata: ' + body + '\n\n');
        let publish = new Promise((resolve, reject) => {
          faas_grip.publish('messages', message, () => {
            resolve();
          });
        });
        await publish;
      } catch (err) {
        console.dir(err);
      }
    }

    @Get('subscribe')
    publish(@Req() req) {
      let padding = new Array(2048);
      let body = ':' + padding.join(' ') + '\n';
      req.res.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Grip-Hold': 'stream',
        'Grip-Channel': 'messages',
        'Grip-Keep-Alive': ':\\n\\n; format=cstring; timeout=20',
      });
      return { body };
    }
  }
}

/*

Dyanmo DB Integration coming soon!

AWS.config.update({ region: 'us-east-1' });

export namespace Messages {
  export interface IResponse {
    headers: object;
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

    public static getTables() {
      let params = {
        Limit: 10,
      };
      new AWS.DynamoDB().listTables(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
    }

    public static async put(text: string) {
      let toPut = {
        Item: {
          id: {
            S: uuid.v4(),
          },
          text: {
            S: text,
          },
        },
        TableName: 'messages',
      };

      return new Promise((resolve, reject) => {
        new AWS.DynamoDB().putItem(toPut, function(err: any, data: any) {
          if (err) reject(err);
          else resolve(data);
        });
      });
    }

    public static async getNewMessage(lastId: number): Promise<IMessage> {
      let id: number;
      do id = Math.round(Math.random() * (this.messages.length - 1));
      while (id === +lastId);

      let text = this.messages[id];

      await this.put(text);

      return { id, text };
    }
  }
}

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  console.dir(event);
  console.dir(context);
  let id: number = +(event.pathParameters || {}).id || -1;
  try {
    let message = await Messages.main.getNewMessage(id);

    const response: Messages.IResponse = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
      body: JSON.stringify(message),
    };

    callback(undefined, response);
  } catch (err) {
    console.error(err);
  }
};
*/
