import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from 'src/modules/common/base.dto';

export class CreateUserDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public login: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  public password: string;
}
