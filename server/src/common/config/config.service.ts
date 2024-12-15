import { Injectable } from '@nestjs/common';
import { EnvironmentVariables, DEFAULT_CONFIGS } from './default.config';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ConfigurationService {
  config: EnvironmentVariables;

  constructor(data: EnvironmentVariables = DEFAULT_CONFIGS) {
    this.config = data;
  }

  private parseEnvironment(env: NodeJS.ProcessEnv): EnvironmentVariables {
    const data: EnvironmentVariables = plainToInstance(
      EnvironmentVariables,
      {
        port: env.PORT ? env.PORT : DEFAULT_CONFIGS.port,
      },
      { enableImplicitConversion: true },
    );
    const errors = validateSync(data);

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return data;
  }

  public loadFromEnvironment() {
    this.parseEnvironment(process.env);
  }
}
