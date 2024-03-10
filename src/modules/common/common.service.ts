import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { DbService } from 'src/db/db.service';
import { BaseDTO } from 'src/base-dto';
import { Track } from 'src/db/models/Track';
import { EDBEntryNames, ETrackRefEntry, TModelType } from 'src/types';

@Injectable()
export class CommonService {
  constructor(public dbService: DbService) {
    undefined;
  }

  public async getInstances<T extends TModelType>(
    name: EDBEntryNames,
  ): Promise<T[]> {
    const instances = await this.dbService.getEntryInstancesByName<T>(name);

    return instances;
  }

  public async getInstanceById<T extends TModelType>(
    name: EDBEntryNames,
    id: string,
    altErr?: () => never,
  ): Promise<T> {
    const instance = this.dbService.getEntryInstanceById<T>(name, id);

    if (!instance) {
      if (altErr) {
        altErr();
      } else {
        throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      return instance;
    }
  }

  public async createInstance<T extends TModelType>(
    name: EDBEntryNames,
    DTO: BaseDTO,
  ): Promise<T> {
    const newInstance = this.dbService.createEntryInstance<T>(name, DTO);

    return newInstance;
  }

  public async updateInstance<T extends TModelType>(
    name: EDBEntryNames,
    id: string,
    DTO: BaseDTO,
    updateCallback: (inst: T, dtoInst: BaseDTO) => T,
  ): Promise<T> {
    const instance = this.dbService.getEntryInstanceById<T>(name, id);

    if (!instance) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return updateCallback(instance, DTO);
    }
  }

  public async deleteInstance<T extends TModelType>(
    name: EDBEntryNames,
    id: string,
  ): Promise<void> {
    return await this.dbService.deleteEntryInstance<T>(name, id);
  }

  public async addInstance<T extends TModelType>(
    name: EDBEntryNames,
    instance: T,
  ) {
    return await this.dbService.addInstance(name, instance);
  }

  public async deleteInstanceWithRef<T extends TModelType>(
    name: EDBEntryNames,
    id: string,
    refEntryName: ETrackRefEntry,
    targets: EDBEntryNames[],
  ) {
    const instance = await this.getInstanceById<T>(name, id);

    targets.forEach(async (target) => {
      const instanceTrack = this.dbService.getEntryInstanceById<T>(
        target,
        instance.id,
        refEntryName,
      ) as Track;

      if (instanceTrack) {
        await instanceTrack.clearRefEntry(refEntryName);
      }
    });

    return await this.deleteInstance<T>(name, id);
  }
}
