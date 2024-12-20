/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { HealthCheck } from './system.interface';
import { AppLoggerService } from '../../core/logger/Applogger.service';
import { Discoverable } from '../../common/decorators';

// const THRESHOLD = 150 * 1024; // 150MB

@Injectable()
@Discoverable()
export class SystemService {
  constructor(private loggerService: AppLoggerService) {}

  /**
   * Executes process.uptime
   *
   *
   * @returns result of process.uptime wrapped with HealthIndicatorResult Interface
   */
  private getServerStatus(): Promise<Pick<HealthCheck, 'server'>> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({
          server: {
            status: 'OK',
            uptime: `${Math.round(process.uptime())}s`,
          },
        });
      }, 1);
    });
  }

  /**
   * Executes process.memoryUsage
   *
   *
   * @returns result of process.memoryUsage wrapped with HealthIndicatorResult Interface
   */
  private getMemoryUsage(): Promise<Pick<HealthCheck, 'memory'>> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        const {
          arrayBuffers,
          external,
          heapTotal,
          heapUsed,
          rss,
        }: NodeJS.MemoryUsage = process.memoryUsage();

        resolve({
          memory: { arrayBuffers, external, heapTotal, heapUsed, rss },
        });
      }, 1);
    });
  }

  /**
   * Consolidates status of the components
   *
   *
   * @returns HealthCheckResult
   */
  public async getSystemStatus(): Promise<HealthCheck> {
    this.loggerService.log('getting the system status');
    const result = await Promise.allSettled([
      this.getServerStatus(),
      this.getMemoryUsage(),
    ]);
    const response: any = [];
    result.forEach((res) => {
      if (res.status === 'fulfilled') {
        response.push(res.value);
      } else {
        response.push(res.reason);
      }
    });

    return response.reduce((p: any, c: any) => {
      return Object.assign(p, c);
    }, {});
  }
}
