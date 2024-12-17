import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { DomainModule } from './domain/domain.module';
import { MiddlewareModule } from './core/middlewares/middlewares.module';
import { AppLoggerModule } from './core/logger/Applogger.module';
import { InjectableModule } from './core/injectables/injectable.module';
import { CorrelationIdMiddleware } from './core/middlewares/correlationId.middleware';
import { RequestLoggerMiddleware } from './core/middlewares/requestLogger.middleware';

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
