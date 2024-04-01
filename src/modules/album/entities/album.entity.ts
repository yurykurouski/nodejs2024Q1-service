import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public year: number;
  @ApiProperty()
  public artistId: string | null;
}
