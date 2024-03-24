import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { MESSAGES } from 'src/constants';
import { EDBEntryNames } from 'src/types';

export class FavoritesEntity {
  @ApiProperty()
  public artists: string[];
  @ApiProperty()
  public albums: string[];
  @ApiProperty()
  public tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  public async addToFavs(kind: EDBEntryNames, id: string) {
    this[kind].push(id);
  }

  public async removeFromFavs(kind: EDBEntryNames, id: string) {
    const itemIndex = this[kind].findIndex((el: string) => el === id);

    if (itemIndex < 0) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      this[kind].splice(itemIndex, 1);
    }
  }
}
