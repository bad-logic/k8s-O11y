import { Injectable, Scope } from '@nestjs/common';
import { Alias } from '../../common/decorators';
import { Discoverable } from '../../common/decorators';

@Injectable({ scope: Scope.REQUEST })
@Discoverable()
export class CorrelationId {
  private uuid: string;

  @Alias('uuid')
  public value: string;
}
