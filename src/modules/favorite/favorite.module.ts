import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { SharedServiceModule } from '../shared/shared-service/shared-service.module';

@Module({
  imports: [SharedServiceModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
