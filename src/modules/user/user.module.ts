import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedServiceModule } from '../shared/shared-service/shared-service.module';
import { USerService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [SharedServiceModule],
  controllers: [UserController],
  providers: [USerService, PrismaService],
})
export class UserModule {}
