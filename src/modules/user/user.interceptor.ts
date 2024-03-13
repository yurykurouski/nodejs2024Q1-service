import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { excludeProperty } from 'src/utils';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserDataInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) =>
            excludeProperty<UserEntity, 'password'>(user, ['password']),
          );
        } else {
          return excludeProperty<UserEntity, 'password'>(data, ['password']);
        }
      }),
    );
  }
}
