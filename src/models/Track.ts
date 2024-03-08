import { ICreateTrackDTO } from 'src/types';
import { generateUUID } from 'src/utils';

export class Track {
  public id: string;
  public name: string;
  public artistId: string | null;
  public albumId: string | null;
  public duration: number;

  constructor({ name, artistId, albumId, duration }: ICreateTrackDTO) {
    this.id = generateUUID();
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }

  public updateTrackInfo({ name, artistId, albumId, duration }) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
