import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public login: string;

  @Exclude()
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}
