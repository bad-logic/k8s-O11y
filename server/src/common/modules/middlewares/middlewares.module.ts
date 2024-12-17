import { Module } from '@nestjs/common';
import { RequestLoggerMiddleware } from './requestLogger.middleware';
import { CorrelationIdMiddleware } from './correlationId.middleware';

@Module({
  imports: [],
  providers: [CorrelationIdMiddleware, RequestLoggerMiddleware],
  exports: [CorrelationIdMiddleware, RequestLoggerMiddleware],
})
export class MiddlewareModule {}
