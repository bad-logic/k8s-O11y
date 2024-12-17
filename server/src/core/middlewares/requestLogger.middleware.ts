import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { AppLoggerService } from '../logger/Applogger.service';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private loggerService: AppLoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.loggerService.log({
      method: req.method,
      url: req.url,
      headers: req.headers,
    });
    next();
  }
}
