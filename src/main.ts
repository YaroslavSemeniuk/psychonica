import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configService } from './shared/config/config.service';
import { ROUTES } from './shared/config/routes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Psychonica Project REST Docs')
    .setDescription('REST docs for Psychonica Website Api')
    .setVersion('1.0')
    .addTag(ROUTES.USER.MAIN)
    .addTag(ROUTES.ANSWER.MAIN)
    .addTag(ROUTES.QUESTION.MAIN)
    .addTag(ROUTES.CATEGORY.MAIN)
    .addTag(ROUTES.ARTICLE.MAIN)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(configService.getPort());
}
bootstrap();
