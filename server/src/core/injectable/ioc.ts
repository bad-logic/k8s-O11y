/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { DiscoveryService } from '@nestjs/core';
import {
  DISCOVER_METADATA_KEY,
  DI_KEY,
  Discoverable,
} from '../../common/decorators';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

@Injectable()
@Discoverable()
export class IOC {
  constructor(private discoveryService: DiscoveryService) {}

  getScope(scope: number | undefined) {
    switch (scope) {
      case undefined:
      case 0:
        return 'DEFAULT';
      case 1:
        return 'TRANSIENT';
      case 2:
        return 'REQUEST';
      default:
        throw new Error(`${scope} not found `);
    }
  }

  refine(items: InstanceWrapper[]) {
    return items
      .filter(
        (p) =>
          p.metatype &&
          Reflect.getMetadata(DISCOVER_METADATA_KEY, p.metatype) === DI_KEY,
      )
      .map(({ scope, name, async, host, id }) => {
        return {
          scope: this.getScope(scope),
          name,
          // async: async || false,
          // id,
          // global: host?.isGlobal || false,
        };
      });
  }

  getIOCStats() {
    return {
      controllers: this.refine(this.discoveryService.getControllers()),
      services: this.refine(this.discoveryService.getProviders()),
    };
  }
}
