import { Module } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Module({
  exports: [DbService],
  providers: [DbService],
})
export class DBModule {}
