import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserDataInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => new UserEntity(user));
        } else {
          return new UserEntity(data);
        }
      }),
    );
  }
}
