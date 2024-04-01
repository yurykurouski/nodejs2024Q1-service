import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { FavoritesEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = {};

        for (const i in data) {
          if (Array.isArray(data[i])) {
            res[i] = data[i].map((fav) => new FavoritesEntity(fav));
          }
        }

        return res;
      }),
    );
  }
}
