import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { writeFile } from 'fs/promises';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { LoggingService } from './logger/logging.service';
import { exceptionHandler } from './helpers/exception.handler';
import { HttpExceptionFilter } from './helpers/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggingService = await app.resolve(LoggingService);

  app.useGlobalFilters(new HttpExceptionFilter(loggingService));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useLogger(loggingService);
  exceptionHandler(loggingService);

  loggingService.initLogFiles();

  const config = new DocumentBuilder()
    .setTitle('Assignment: REST Service')
    .setDescription('The REST API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  if (process.argv[2] === 'docGen') {
    //generate docs
    writeFile('./doc/api.yaml', JSON.stringify(document));
  }

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
