import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { SharedServiceModule } from '../shared/shared-service/shared-service.module';

@Module({
  imports: [SharedServiceModule],
  controllers: [UserController],
})
export class UserModule {}
