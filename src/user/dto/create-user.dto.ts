import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDTO } from 'src/dto';

export class CreateUserDTO extends BaseDTO {
  @IsString()
  @ApiProperty()
  public login: string;
  @IsString()
  @ApiProperty()
  public password: string;
}
