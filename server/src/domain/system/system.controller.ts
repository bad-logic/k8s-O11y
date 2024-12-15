import { Controller, Get } from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private systemService: SystemService) {}

  @Get('/health')
  check() {
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
