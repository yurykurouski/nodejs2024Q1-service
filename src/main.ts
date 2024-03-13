import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { writeFile } from 'fs/promises';
import { ClassSerializerInterceptor } from '@nestjs/common';

ConfigModule.forRoot();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

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
