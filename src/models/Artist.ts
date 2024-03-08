import { ICreateArtistDTO } from 'src/types';
import { generateUUID } from 'src/utils';

export class Artist {
  public id: string;
  public name: string;
  public grammy: boolean;

  constructor({ name, grammy }: ICreateArtistDTO) {
    this.id = generateUUID();
    this.name = name;
    this.grammy = grammy;
  }

  public updateArtistInfo({ name, grammy }) {
    this.name = name;
    this.grammy = grammy;
  }
}
