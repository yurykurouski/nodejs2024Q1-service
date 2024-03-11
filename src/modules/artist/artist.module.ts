import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { SharedServiceModule } from '../shared/shared-service/shared-service.module';

@Module({
  imports: [SharedServiceModule],
  controllers: [ArtistController],
})
export class ArtistModule {}
