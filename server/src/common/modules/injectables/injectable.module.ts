import { Global, Module } from '@nestjs/common';
import { CorrelationId } from './correlationId';

@Global()
@Module({
  providers: [CorrelationId],
  exports: [CorrelationId],
})
export class InjectableModule {}
