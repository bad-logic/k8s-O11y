import { Injectable, Scope } from '@nestjs/common';
import { Alias } from '../../common/decorators';

@Injectable({ scope: Scope.REQUEST })
export class CorrelationId {
  private uuid: string;

  @Alias('uuid')
  public value: string;
}
