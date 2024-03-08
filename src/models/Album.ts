import { ICreateAlbumDTO } from 'src/types';
import { generateUUID } from 'src/utils';

export class Album {
  public id: string;
  public name: string;
  public year: number;
  public artistId: string | null;

  constructor({ name, year, artistId }: ICreateAlbumDTO) {
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
}
