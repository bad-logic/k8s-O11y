import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  public checkServer(): HealthIndicatorResult {
    return {
      server: {
        status: 'up',
      },
    };
  }
}
