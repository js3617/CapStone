import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as winston from 'winston';
import { WinstonModule, utilities } from 'nest-winston';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.STAGE === 'prod' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('Capstone', { prettyPrint: true }),
          ),
        }),
      ],
    }),
  });

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('NestJS project API description')
    .setVersion('1.0')
    .build();
  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  await app.listen(port);
  Logger.log(`listening on port http://localhost:${port}`);
  Logger.log(`STAGE: ${process.env.STAGE}`);
}
bootstrap();
