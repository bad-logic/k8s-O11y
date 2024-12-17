import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigModule } from './core/config/config.module';
import { DomainModule } from './domain/domain.module';
import { MiddlewareModule } from './core/middleware/middlewares.module';
import { AppLoggerModule } from './core/logger/Applogger.module';
import { InjectableModule } from './core/injectable/injectable.module';
import { CorrelationIdMiddleware } from './core/middleware/correlationId.middleware';
import { RequestLoggerMiddleware } from './core/middleware/requestLogger.middleware';
import { IOC } from './core/injectable/ioc';
import { ConfigurationService } from './core/config/config.service';

@Module({
  imports: [
    DomainModule,
    ConfigModule,
    InjectableModule,
    AppLoggerModule,
    MiddlewareModule,
  ],
})
export class AppModule implements NestModule, OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);

  constructor(
    private readonly ioc: IOC,
    private readonly configService: ConfigurationService,
  ) {}

  onApplicationBootstrap() {
    this.logger.debug({ 'IOC: ': this.ioc.getIOCStats() });
    this.logger.debug({ 'env: ': this.configService.vars });
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationIdMiddleware, RequestLoggerMiddleware)
      .forRoutes('*');
  }
}
