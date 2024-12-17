import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from './common/modules/config/config.module';
import { AppLoggerModule } from './common/modules/logger/Applogger.module';
import { CorrelationIdMiddleware } from './common/modules/middlewares/correlationId.middleware';
import { MiddlewareModule } from './common/modules/middlewares/middlewares.module';
import { RequestLoggerMiddleware } from './common/modules/middlewares/requestLogger.middleware';
import { InjectableModule } from './common/modules/injectables/injectable.module';

@Module({
  imports: [
    DomainModule,
    ConfigModule,
    InjectableModule,
    AppLoggerModule,
    MiddlewareModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware, RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
