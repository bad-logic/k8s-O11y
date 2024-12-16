import { Injectable, NestMiddleware } from '@nestjs/common';
import { CorrelationIdService } from './correlationId.service';
import { NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private correlationIdService: CorrelationIdService) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (!this.correlationIdService.correlationId) {
      // in cases of the request already has a id extract from the request header and use that one
      // or if not provided in header create one
      this.correlationIdService.correlationId = randomUUID();
    }
    next();
  }
}
