import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { Context, Handler } from 'aws-lambda';
import * as serverless from 'aws-serverless-express';
import { NestFactory } from '@nestjs/core';
const express = require('express')();

import { Messages } from './Messages';
export * from './Messages';

@Module({
  imports: [],
  controllers: [Messages.main],
  components: [],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CorsMiddleware).forRoutes(Messages.main);
  }
}

let server;
const createServer = () => {
  return new Promise((resolve, reject) => {
    NestFactory.create(AppModule, express).then(app => {
      app.init().then(() => {
        resolve(serverless.createServer(express));
      });
    });
  });
};

export const handler: Handler = (event: any, context: Context) => {
  if (server) return serverless.proxy(server, event, context);
  else
    createServer().then(serve => {
      server = serve;
      return serverless.proxy(server, event, context);
    });
};
