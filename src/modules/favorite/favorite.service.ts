import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DEFAULT_FAV_ID, MESSAGES } from 'src/constants';
import { EEntityName } from 'src/types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  public async getFavorites() {
    return await this.prisma.favorites.findUnique({
      where: { id: DEFAULT_FAV_ID },
      include: {
        albums: true,
        artists: true,
        tracks: true,
      },
    });
  }

  public async addToFavs(entityName: EEntityName, id: string) {
    //@ts-expect-error poor typization
    const entity = await this.prisma[entityName].findUnique({
      where: { id },
    });

    if (!entity) {
      throw new HttpException(
        MESSAGES.NO_ENTRY_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      //@ts-expect-error poor typization
      await this.prisma[entityName].update({
        where: {
          id,
        },
        data: {
          favoritesId: DEFAULT_FAV_ID,
        },
      });

      return entity;
    }
  }

  public async removeFromFavs(entityName: EEntityName, id: string) {
    //@ts-expect-error poor typization
    return await this.prisma[entityName].update({
      where: {
        id,
      },
      data: {
        favoritesId: null,
      },
    });
  }
}
