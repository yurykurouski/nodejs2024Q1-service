import { Module } from '@nestjs/common';
import { DbService } from 'src/modules/db/db.service';

@Module({
  exports: [DbService],
  providers: [DbService],
})
export class DBModule {}
