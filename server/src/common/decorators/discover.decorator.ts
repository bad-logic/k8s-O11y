import { SetMetadata } from '@nestjs/common';

export const DISCOVER_METADATA_KEY = Symbol('NEST_APP_K8SO11Y');
export const DI_KEY = 'app_injectables';

export const Discoverable = () => SetMetadata(DISCOVER_METADATA_KEY, DI_KEY);
