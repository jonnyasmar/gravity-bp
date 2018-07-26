import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { Context, Handler } from 'aws-lambda';
import * as serverless from 'aws-serverless-express';
import { NestFactory } from '@nestjs/core';
const express = require('express')();

import { Events } from 'api/Events';
import { User } from 'api/User';
import { Chat } from 'api/Chat';
export { Events, User, Chat };

const controllers = [Events, User, Chat];

@Module({
  imports: [],
  controllers,
  components: [],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CorsMiddleware).forRoutes(...controllers);
  }
}

let served;
const createServer = () => {
  return NestFactory.create(AppModule, express)
    .then(app => {
      app.setGlobalPrefix('api');
      app.init();
    })
    .then(() => serverless.createServer(express));
};

export const handler: Handler = (event: any, context: Context) => {
  // Hack to fix empty Content-Length header on DELETE requests
  // Fix has been committed to aws-serverless-express; awaiting merge
  // see https://github.com/awslabs/aws-serverless-express/issues/106
  if (event.httpMethod === 'DELETE' && event.body && (!event.headers || !event.headers['Conent-Length'])) {
    console.log('Adding content length for DELETE body');
    event.headers = event.headers || {};
    event.headers['Content-Length'] = Buffer.byteLength(event.body);
  }

  if (served) {
    console.log('Loading existing NestJS server...');
    return serverless.proxy(served, event, context);
  } else {
    console.log('Creating NestJS server...');
    createServer().then(server => {
      served = server;
      return serverless.proxy(served, event, context);
    });
  }
};
