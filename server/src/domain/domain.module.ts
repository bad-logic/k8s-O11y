import { Module } from '@nestjs/common';
import { SystemHealthModule } from './system/system.module';

@Module({
  imports: [SystemHealthModule],
})
export class DomainModule {}
