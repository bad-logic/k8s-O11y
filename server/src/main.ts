import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigurationService } from './core/config/config.service';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const logger = new Logger('NestApplication');
  const configService = app.get(ConfigurationService);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     transform: true,
  //     forbidNonWhitelisted: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     },
  //   }),
  // );

  await app.listen(configService.port, () => {
    logger.log(`Server is listening at port ${configService.port}`);
  });
}
bootstrap();
