import { MiddlewaresConsumer, Module, NestModule } from '@nestjs/common';
import { CorsMiddleware } from '@nest-middlewares/cors';
import { Context, Handler } from 'aws-lambda';
import * as serverless from 'aws-serverless-express';
import { NestFactory } from '@nestjs/core';
const express = require('express')();

import { Events } from 'api/Events';
import { User } from 'api/User';
export * from 'api/Events';
export * from 'api/User';

@Module({
  imports: [],
  controllers: [Events, User],
  components: [],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(CorsMiddleware).forRoutes(Events, User);
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
