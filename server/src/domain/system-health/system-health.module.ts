import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { SystemHealthController } from './system-health.controller';
import { SystemHealthService } from './system-health.service';

@Module({
  imports: [TerminusModule],
  controllers: [SystemHealthController],
  providers: [SystemHealthService],
})
export class SystemHealthModule {}
