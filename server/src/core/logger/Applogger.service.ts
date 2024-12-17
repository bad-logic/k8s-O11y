import {
  ConsoleLogger,
  Inject,
  Injectable,
  LogLevel,
  Scope,
} from '@nestjs/common';
import { CorrelationId } from '../injectables/correlationId';
import { INQUIRER } from '@nestjs/core';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLoggerService extends ConsoleLogger {
  constructor(
    private correlationId: CorrelationId,
    @Inject(INQUIRER) private parentClass: object,
  ) {
    super(parentClass?.constructor?.name, { timestamp: true });
  }

  override error(err: Error) {
    super.error(err.message, err.stack);
  }

  override formatMessage(
    logLevel: LogLevel,
    message: unknown,
    pidMessage: string,
    formattedLogLevel: string,
    contextMessage: string,
    timestampDiff: string,
  ) {
    const output = this.stringifyMessage(message, logLevel);
    pidMessage = this.colorize(pidMessage, logLevel);
    formattedLogLevel = this.colorize(formattedLogLevel, logLevel);
    return `${pidMessage}${this.getTimestamp()} ${formattedLogLevel} ${contextMessage}CORRELATION_ID:${this.correlationId.value} ${output}${timestampDiff}\n`;
  }
}
