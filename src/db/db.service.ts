import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES, MODELS } from 'src/constants';
import { BaseDTO } from 'src/dto';
import { Album } from 'src/models/Album';
import { Artist } from 'src/models/Artist';
import { Favorites } from 'src/models/Favorite';
import { Track } from 'src/models/Track';
import { User } from 'src/models/User';
import { EDBEntryNames, TModelType } from 'src/types';

@Injectable()
export class DbService {
  private users: User[];
  private artists: Artist[];
  private tracks: Track[];
  private albums: Album[];
  private _favorites: Favorites;

  constructor() {
    this.users = [];
    this.artists = [];
    this.tracks = [];
    this.albums = [];
    this._favorites = new Favorites();
  }

  public get favorites() {
    return this._favorites;
  }

  public async getFaforites() {
    const test1 = Object.entries(this._favorites).reduce(
      (acc, [entry, favIDs]) => {
        return {
          ...acc,
          [entry]: favIDs.map((id: string) =>
            this.getEntryInstanceById(entry as EDBEntryNames, id),
          ),
        };
      },
      {},
    );

    return test1;
  }

  public getEntryInstancesByName<T extends TModelType>(
    entryName: EDBEntryNames,
  ): T[] {
    return this[entryName] as T[];
  }

  public async addInstance<T extends TModelType>(
    entryName: EDBEntryNames,
    instance: T,
  ) {
    const instances = this[entryName] as T[];

    return instances[instances.push(instance) - 1];
  }

  public getEntryInstanceById<T extends TModelType>(
    entryName: EDBEntryNames,
    id: string,
    idName = 'id',
  ): T {
    const entries = this[entryName] as T[];

    return entries[entries.findIndex((el) => el[idName] === id)];
  }
  public async createEntryInstance<T extends TModelType>(
    entryName: EDBEntryNames,
    dto: BaseDTO,
  ): Promise<T> {
    const newInstance = new MODELS[entryName](dto) as T;

    return await this.addInstance(entryName, newInstance);
  }
  public async deleteEntryInstance<T extends TModelType>(
    entryName: EDBEntryNames,
    id: string,
  ) {
    const entries = this.getEntryInstancesByName<T>(entryName);

    const index = entries.findIndex((el) => el.id === id);

    if (index < 0) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      entries.splice(index, 1);
    }
  }
}
