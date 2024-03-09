import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { MESSAGES } from 'src/constants';
import { DbService } from 'src/db/db.service';
import { BaseDTO } from 'src/dto';
import { Track } from 'src/models/Track';
import { EDBEntryNames, ETrackRefEntry, IBaseDTO, TModelType } from 'src/types';
import { isValidUUID } from 'src/utils';

@Injectable()
export class CommonService {
  constructor(public dbService: DbService) {
    undefined;
  }

  public validateUUID(uuid: string) {
    if (!isValidUUID(uuid)) {
      throw new HttpException(MESSAGES.NOT_UUID, HttpStatus.BAD_REQUEST);
    }
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
    this.validateUUID(id);

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
    cls: typeof BaseDTO,
    DTO: IBaseDTO,
  ): Promise<T> {
    const instance = plainToInstance(cls, DTO);

    return validate(instance).then((errors) => {
      if (errors.length) {
        throw new HttpException(
          MESSAGES.CANT_VALIDATE_DATA,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const newInstance = this.dbService.createEntryInstance<T>(
          name,
          instance,
        );

        return newInstance;
      }
    });
  }

  public async updateInstance<T extends TModelType>(
    name: EDBEntryNames,
    id: string,
    cls: typeof BaseDTO,
    DTO: IBaseDTO,
    updateCallback: (inst: T, dtoInst: BaseDTO) => T,
  ): Promise<T> {
    this.validateUUID(id);

    const dtoInstance = plainToInstance(cls, DTO);

    return validate(dtoInstance).then((errors) => {
      if (errors.length) {
        throw new HttpException(
          MESSAGES.CANT_VALIDATE_DATA,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const instance = this.dbService.getEntryInstanceById<T>(name, id);

        if (!instance) {
          throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
          return updateCallback(instance, dtoInstance);
        }
      }
    });
  }

  public async deleteInstance<T extends TModelType>(
    name: EDBEntryNames,
    id: string,
  ): Promise<void> {
    this.validateUUID(id);

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
