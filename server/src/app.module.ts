import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from './common/modules/config/config.module';
import { AppLoggerModule } from './common/modules/logger/Applogger.module';
import { CorrelationIdMiddleware } from './common/modules/logger/correlationId.middleware';

@Module({
  imports: [DomainModule, ConfigModule, AppLoggerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
