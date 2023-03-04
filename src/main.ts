import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TweetsModule } from './modules/tweets/tweets.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Supply Chain')
    .setDescription('Supply Chain API description')
    .setVersion('1.0')
    .addTag('tweets')
    .build();
  const tweetDocument = SwaggerModule.createDocument(app, config, {
    include: [TweetsModule],
  });
  SwaggerModule.setup('api/tweet', app, tweetDocument);

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
