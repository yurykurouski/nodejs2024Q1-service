import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { SharedServiceModule } from '../shared/shared-service/shared-service.module';

@Module({
  imports: [SharedServiceModule],
  controllers: [TrackController],
})
export class TrackModule {}
