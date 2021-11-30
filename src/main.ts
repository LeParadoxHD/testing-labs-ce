import { NestFactory } from '@nestjs/core';
import { readFileSync, existsSync } from 'fs';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from './app.module';
import { createServer as https, server } from 'spdy';
import { createServer as http } from 'http';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {

  /**
   * SERVER FLOW
   * 
   * NestJS  -->  Express  -->  HTTP
   *                       -->  HTTPS (http/2)
   */

  // Setup SSL for HTTPS
  const serverOptions: server.ServerOptions = {};
  if (existsSync('/certificates')) {
    serverOptions.key = readFileSync('/certificates/_archive/JzLnTG/privkey.pem');
    serverOptions.cert = readFileSync('/certificates/_archive/JzLnTG/cert.pem');
  } else {
    serverOptions.key = readFileSync(__dirname + '/certificates/privkey.localhost.pem');
    serverOptions.cert = readFileSync(__dirname + '/certificates/cert.localhost.pem');
  }

  // Create Express server
  const expressApp = express();
  
  // Create NestJS Server and bind to Express instance
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Create HTTP server
  const httpServer = http(expressApp);
  // Create HTTPS server with HTTP/2
  const httpsServer = https(serverOptions, expressApp);

  // Create WebSocket Adapter instance and bind to server (only HTTPS - with wss://)
  // useWebSocketAdapter can only bind to one server
  const httpsWebSocketAdapter = new IoAdapter(httpsServer);
  app.useWebSocketAdapter(httpsWebSocketAdapter);

  // Enable Body validation params
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  // Enable Cors
  app.enableCors();

  // Enable GZip
  app.use(compression())

  app.use(helmet())

  // Initialize NestJS Server
  await app.init();

  // Ready to listen on ports
  await httpsServer.listen(443);
  await httpServer.listen(80);
}
bootstrap();