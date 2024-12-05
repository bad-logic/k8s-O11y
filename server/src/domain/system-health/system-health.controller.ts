import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { SystemHealthService } from './system-health.service';

@Controller('system-health')
export class SystemHealthController {
  constructor(private systemHealthService: SystemHealthService) {}

  @Get()
  @HealthCheck()
  check() {
    return this.systemHealthService.getSystemStatus();
  }
}
