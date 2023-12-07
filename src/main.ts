import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
const DailyRotateFile = require('winston-daily-rotate-file');

async function bootstrap() {
  // dotenv.config({ path: '.env' });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
            format: winston.format.combine(
              // winston.format.colorize({ all: true }),
              winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss', }),
              winston.format.metadata({
                fillExcept: [
                  'message',
                  'level',
                  'timestamp',
                  'label',
                  'context'
                ],
              }),
              nestWinstonModuleUtilities.format.nestLike('Proyecto Logging', { colors: true, prettyPrint: false }),
            ),
            level: 'debug',
        }),
        new winston.transports.File({
          format: winston.format.combine(
            // winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS', }),
            nestWinstonModuleUtilities.format.nestLike('Proyecto Logging', { colors: false, prettyPrint: false }),
          ),
          level: 'info',
          filename: 'logs/prueba.log',
        }),
        new DailyRotateFile({
          filename: 'logs/rotar-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          format: winston.format.combine(
            // winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS', }),
            nestWinstonModuleUtilities.format.nestLike('Proyecto Logging', { colors: false, prettyPrint: false }),
          ),
        }),
        new DailyRotateFile({
          filename: 'logs/warn-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          format: winston.format.combine(
            // winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'DD/MM/YYYY HH:mm:ss.SSS', }),
            nestWinstonModuleUtilities.format.nestLike('Proyecto Logging', { colors: false, prettyPrint: false }),
          ),
          level: 'warn',
        })
        // new winston.transports.Http(OPCIONES_HTTP),
      ]
    })
  });

  const config = new DocumentBuilder()
    .setTitle('Proyecto Logging')
    .setDescription('API de Proyecto Logging')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  console.log(process.env.AMBIENTE)
  await app.listen(process.env.PUERTO);
}
bootstrap();
