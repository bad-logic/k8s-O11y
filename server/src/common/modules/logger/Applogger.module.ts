import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './Applogger.service';
import { CorrelationIdService } from './correlationId.service';
import { CorrelationIdMiddleware } from './correlationId.middleware';

@Global()
@Module({
  providers: [AppLoggerService, CorrelationIdService, CorrelationIdMiddleware],
  exports: [AppLoggerService, CorrelationIdService, CorrelationIdMiddleware],
})
export class AppLoggerModule {}
