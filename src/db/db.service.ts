import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES, MODELS } from 'src/constants';
import { Artist } from 'src/models/Artist';
import { User } from 'src/models/User';
import { EDBEntryNames } from 'src/types';

type TModelType = User | Artist;

@Injectable()
export class DbService {
  private _users: User[];
  private _artists: Artist[];

  constructor() {
    this._users = [];
    this._artists = [];
  }

  public getEntryInstancesByName<T extends TModelType>(
    entryName: EDBEntryNames,
  ): T[] {
    return this[entryName] as T[];
  }

  public getEntryInstanceById<T extends TModelType>(
    entryName: EDBEntryNames,
    id: string,
  ): T {
    const entries = this[entryName] as T[];

    return entries[entries.findIndex((el) => el.id === id)];
  }
  public addEntryInstance<T extends TModelType>(
    entryName: EDBEntryNames,
    dto,
  ): T {
    const newInstance = new MODELS[entryName](dto) as T;

    const instances = this[entryName] as T[];

    return instances[instances.push(newInstance) - 1];
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
