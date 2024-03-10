import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { BaseDTO } from 'src/modules/common/base.dto';

export class CreateTrackDTO extends BaseDTO {
  @IsString()
  @ApiProperty()
  public name: string;
  @IsNumber()
  @ApiProperty()
  public duration: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  public artistId: string;
  @IsString()
  @IsOptional()
  @ApiProperty()
  public albumId: string;
}
