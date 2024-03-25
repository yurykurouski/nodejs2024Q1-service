import { ApiProperty } from '@nestjs/swagger';

export class TrackEntity {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public artistId: string | null;
  @ApiProperty()
  public albumId: string | null;
  @ApiProperty()
  public duration: number;
}
