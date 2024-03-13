import { Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { PrismaModule } from 'src/modules/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [SharedService],
  providers: [SharedService],
})
export class SharedServiceModule {}
