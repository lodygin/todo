import { type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { type ClassConstructor, plainToClass } from 'class-transformer';
import { map, type Observable } from 'rxjs';

export class SerializeInterceptor<T = unknown> implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<T>) {}

  intercept(_: ExecutionContext, handler: CallHandler<unknown>): Observable<T> {
    return handler
      .handle()
      .pipe(map(data => plainToClass(this.dto, data, { excludeExtraneousValues: true })));
  }
}
