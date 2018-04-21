import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { Context, Handler } from 'aws-lambda';
import * as serverless from 'aws-serverless-express';
import { NestFactory } from '@nestjs/core';
const express = require('express')();

import { Messages } from 'api/Messages';
export * from 'api/Messages';

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

let served;
const createServer = () => {
  return NestFactory.create(AppModule, express)
    .then(app => app.init())
    .then(() => serverless.createServer(express));
};

export const handler: Handler = (event: any, context: Context) => {
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
