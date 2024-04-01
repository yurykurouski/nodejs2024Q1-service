import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

export class UserEntity {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public login: string;

  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(data: UserEntity) {
    Object.assign(this, data);

    this.createdAt = new Date(data.createdAt).getTime();
    this.updatedAt = new Date(data.updatedAt).getTime();
  }
}
