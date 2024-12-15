import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [DomainModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
