import { IsNumber, Max, Min } from 'class-validator';

export class EnvironmentVariables {
  @IsNumber()
  @Min(1024)
  @Max(65535)
  readonly port: number;
}

export const DEFAULT_CONFIGS: EnvironmentVariables = {
  port: 3000,
};
