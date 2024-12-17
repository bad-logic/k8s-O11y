import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './Applogger.service';

@Global()
@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
