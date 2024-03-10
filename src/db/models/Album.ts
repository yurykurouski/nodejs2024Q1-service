import { ApiProperty } from '@nestjs/swagger';
import { CreateAlbumDTO } from 'src/modules/album/dto/create-album.dto';
import { ETrackRefEntry } from 'src/types';
import { generateUUID } from 'src/utils';

export class Album {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public year: number;
  @ApiProperty()
  public artistId: string | null;

  constructor({ name, year, artistId }: CreateAlbumDTO) {
    this.id = generateUUID();
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public updateAlbumInfo({ name, year, artistId }) {
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  public async clearRefEntry(entryName: ETrackRefEntry) {
    this[entryName] = null;
  }
}
