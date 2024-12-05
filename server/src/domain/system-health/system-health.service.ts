import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  // HealthIndicatorStatus,
} from '@nestjs/terminus';

interface MemoryUsage {
  /**
   * Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the
   * process, including all C++ and JavaScript objects and code.
   */
  rss: number;
  /**
   * Refers to V8's memory usage.
   */
  heapTotal: number;
  /**
   * Refers to V8's memory usage.
   */
  heapUsed: number;
  external: number;
  /**
   * Refers to memory allocated for `ArrayBuffer`s and `SharedArrayBuffer`s, including all Node.js Buffers. This is also included
   * in the external value. When Node.js is used as an embedded library, this value may be `0` because allocations for `ArrayBuffer`s
   * may not be tracked in that case.
   */
  arrayBuffers: number;
}

// const THRESHOLD = 150 * 1024; // 150MB

@Injectable()
export class SystemHealthService {
  constructor(private health: HealthCheckService) {}

  /**
   * Executes process.uptime
   *
   *
   * @returns result of process.uptime wrapped with HealthIndicatorResult Interface
   */
  private getServerStatus(): Promise<HealthIndicatorResult> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({
          server: {
            status: 'up',
            uptime: `${process.uptime()}s`,
          },
        });
      });
    });
  }

  /**
   * Executes process.memoryUsage
   *
   *
   * @returns result of process.memoryUsage wrapped with HealthIndicatorResult Interface
   */
  private getMemoryUsage(): Promise<HealthIndicatorResult> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        const {
          arrayBuffers,
          external,
          heapTotal,
          heapUsed,
          rss,
        }: MemoryUsage = process.memoryUsage();
        // let status: HealthIndicatorStatus = 'up';
        // if (heapUsed / heapTotal > 0.8) status = 'down';

        resolve({
          memory: {
            status: 'up',
            arrayBuffers,
            external,
            heapTotal,
            heapUsed,
            rss,
          },
        });
      });
    });
  }

  /**
   * Consolidates status of the components
   *
   *
   * @returns HealthCheckResult
   */
  public getSystemStatus(): Promise<HealthCheckResult> {
    return this.health.check([this.getServerStatus, this.getMemoryUsage]);
  }
}
