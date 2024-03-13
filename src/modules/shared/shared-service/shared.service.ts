import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { EDBEntryName, ETrackRefEntry, TEntityType } from 'src/types';
import { BaseDTO } from '../base.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class SharedService {
  constructor(private prisma: PrismaService) {
    undefined;
  }

  public async getInstances<T extends TEntityType>(
    name: EDBEntryName,
  ): Promise<T[]> {
    const instances = await this.prisma[name].findMany();

    return instances as T[];
  }

  public async getInstanceById<T extends TEntityType>(
    name: EDBEntryName,
    id: string,
    altErr?: () => never,
  ): Promise<T> {
    const instance = await this.prisma[name].findUnique({ where: { id } });

    if (!instance) {
      if (altErr) {
        altErr();
      } else {
        throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    } else {
      return instance as T;
    }
  }

  public async createInstance<T extends TEntityType>(name: EDBEntryName, data) {
    const newInstance = this.prisma[name].create({ data });

    return newInstance;
  }

  public async updateInstance<T extends TEntityType>(
    name: EDBEntryName,
    id: string,
    data: BaseDTO,
  ) {
    try {
      const instance = await this.prisma[name].update({
        where: { id },
        data,
      });

      return instance;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  public async deleteInstanceWithRef<T extends TEntityType>(
    name: EDBEntryName,
    id: string,
    refEntryName?: ETrackRefEntry,
    targets?: EDBEntryName[],
  ) {
    try {
      const instance = await this.prisma[name].delete({ where: { id } });

      return instance;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
