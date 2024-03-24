import { ApiProperty } from '@nestjs/swagger';
import { CreateTrackDTO } from 'src/modules/track/dto/create-track.dto';
import { UpdateTrackDTO } from 'src/modules/track/dto/update-track.dto';
import { ETrackRefEntry } from 'src/types';
import { generateUUID } from 'src/utils';

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

  constructor({ name, artistId, albumId, duration }: CreateTrackDTO) {
    this.id = generateUUID();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public updateTrackInfo({
    name,
    artistId,
    albumId,
    duration,
  }: UpdateTrackDTO) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public async clearRefEntry(entryName: ETrackRefEntry) {
    this[entryName] = null;
  }
}
