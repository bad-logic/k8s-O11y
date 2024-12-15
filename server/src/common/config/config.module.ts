import { Module } from '@nestjs/common';
import { ConfigurationService } from './config.service';

const configServiceFactory = {
  provide: ConfigurationService,
  useFactory: () => {
    const config = new ConfigurationService();
    config.loadFromEnvironment();
    return config;
  },
};

@Module({
  providers: [configServiceFactory],
  exports: [configServiceFactory],
})
export class ConfigModule {}
