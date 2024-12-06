import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Get('/health')
  @HealthCheck()
  check() {
    // return this.systemService.getSystemStatus();
    return {
      message: 'OK',
    };
  }

  @Get('/profile-start')
  startProfiling() {
    return {
      message: 'profiling started',
    };
  }

  @Get('/profile-stop')
  stopProfiling() {
    return {
      message: 'profiling stopped',
    };
  }

  @Get('/profile-logs')
  getProfileLogs() {
    return {
      data: 'sdfdsf',
    };
  }
}
