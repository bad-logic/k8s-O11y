import { Injectable, Scope } from '@nestjs/common';
import { Alias } from '../../decorators';

@Injectable({ scope: Scope.REQUEST })
export class CorrelationIdService {
  private uuid: string;

  @Alias('uuid')
  public correlationId: string;
}
