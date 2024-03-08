import { generateUUID } from 'src/utils';

export class Artist {
  public id: string;
  public name: string;
  public grammy: boolean;

  constructor(name: string) {
    this.id = generateUUID();
    this.name = name;
    this.grammy = false;
  }

  public updateArtistInfo({ name, grammy }) {
    this.name = name;
    this.grammy = grammy;
  }
}
