import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AppLoggerService } from '../logger/Applogger.service';
import { Discoverable } from '../../common/decorators';

@Injectable()
@Discoverable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: AppLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.loggerService.log({
      method: req.method,
      url: (req as any).originalUrl,
      userAgent: (req.headers as any)['user-agent'],
      ip: (req.headers as any)['x-forwarded-for'] || (req as any).ip,
    });
    next();
  }
}
