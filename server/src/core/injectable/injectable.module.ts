import { DiscoveryModule } from '@nestjs/core';
import { Global, Module } from '@nestjs/common';
import { CorrelationId } from './correlationId';
import { IOC } from './ioc';

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: [CorrelationId, IOC],
  exports: [CorrelationId, IOC],
})
export class InjectableModule {}
