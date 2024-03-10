import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseDTO } from 'src/modules/common/base.dto';

export class UpdateUserPasswordDTO extends BaseDTO {
  @IsString()
  @ApiProperty()
  oldPassword: string;
  @IsString()
  @ApiProperty()
  newPassword: string;
}
