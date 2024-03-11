import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { BaseDTO } from 'src/modules/shared/base.dto';

export class CreateAlbumDTO extends BaseDTO {
  @IsString()
  @ApiProperty()
  public name: string;
  @IsNumber()
  @ApiProperty()
  public year: number;
  @IsString()
  @IsOptional()
  @ApiProperty()
  public artistId: string;
}
