import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public grammy: boolean;
}
