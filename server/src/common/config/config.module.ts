import { Module } from '@nestjs/common';
import { ConfigurationService } from './config.service';

const CONFIG_SERVICE = {
  provide: ConfigurationService,
  useFactory: () => {
    const config = new ConfigurationService();
    config.loadFromEnvironment();
    return config;
  },
};

@Module({
  providers: [CONFIG_SERVICE],
  exports: [CONFIG_SERVICE],
})
export class ConfigModule {}
