import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { BaseDTO } from 'src/base-dto';

export class CreateArtistDTO extends BaseDTO {
  @IsString()
  @ApiProperty()
  public name: string;
  @IsBoolean()
  @ApiProperty()
  public grammy: boolean;
}
