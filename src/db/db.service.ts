import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES, MODELS } from 'src/constants';
import { BaseDTO } from 'src/base-dto';
import { Album } from 'src/db/models/Album';
import { Artist } from 'src/db/models/Artist';
import { Favorites } from 'src/db/models/Favorite';
import { Track } from 'src/db/models/Track';
import { User } from 'src/db/models/User';
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
    return Object.entries(this.favorites).reduce(
      (acc, [entry, favIDs]) => ({
        ...acc,
        [entry]: favIDs.reduce((acc: TModelType[], id: string) => {
          const model = this.getEntryInstanceById(entry as EDBEntryNames, id);

          if (model) {
            acc.push(model);
          }

          return acc;
        }, []),
      }),
      {},
    );
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
