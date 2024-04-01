import { IsNotEmpty, IsString } from 'class-validator';
import { BaseDTO } from 'src/modules/shared/base.dto';

export class UpdateRefreshDTO extends BaseDTO {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
