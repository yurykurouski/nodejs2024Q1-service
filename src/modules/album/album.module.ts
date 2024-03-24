import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { SharedServiceModule } from '../shared/shared-service/shared-service.module';

@Module({
  imports: [SharedServiceModule],
  controllers: [AlbumController],
})
export class AlbumModule {}
