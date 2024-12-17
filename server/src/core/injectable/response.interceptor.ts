import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Discoverable } from '../../common/decorators';

// Aspect oriented programming

@Injectable()
@Discoverable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before....');
    return next.handle().pipe(tap((data) => console.log('After ...', data)));
  }
}
