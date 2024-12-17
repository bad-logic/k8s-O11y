import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';
import { AppLoggerService } from '../../core/logger/Applogger.service';

@Controller('system')
export class SystemController {
  constructor(
    private systemService: SystemService,
    private loggerService: AppLoggerService,
  ) {}

  @Get('/health')
  check() {
    this.loggerService.log('hello from system controller');
    return this.systemService.getSystemStatus();
  }

  // @Get('/profile-start')
  // startProfiling() {
  //   return {
  //     message: 'profiling started',
  //   };
  // }

  // @Get('/profile-stop')
  // stopProfiling() {
  //   return {
  //     message: 'profiling stopped',
  //   };
  // }

  // @Get('/profile-logs')
  // getProfileLogs() {
  //   return {
  //     data: 'sdfdsf',
  //   };
  // }
}
