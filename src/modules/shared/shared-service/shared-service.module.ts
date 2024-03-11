import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  exports: [SharedService],
  providers: [SharedService],
})
export class SharedServiceModule {}
