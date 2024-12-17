import { Injectable, NestMiddleware } from '@nestjs/common';
import { CorrelationId } from '../injectables/correlationId';
import { NextFunction } from 'express';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
  constructor(private correlationId: CorrelationId) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (!this.correlationId.value) {
      // in cases of the request already has a id extract from the request header and use that one
      // or if not provided in header create one
      this.correlationId.value = randomUUID();
    }
    next();
  }
}
