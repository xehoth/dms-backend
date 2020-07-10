import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // API Document
  const options = new DocumentBuilder().setTitle("API 文档").setDescription("API 文档").setVersion("0.1").build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  // server port (default: 3000)
  const PORT = process.env.SERVER_PORT || 3000;
  await app.listen(PORT);
  console.log(`http://localhost:${PORT}/docs`);
}
bootstrap();
