import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { EEntityName } from 'src/types';
import { FavoriteService } from './favorite.service';
import { MESSAGES } from 'src/constants';

const whitelist = [EEntityName.TRACK, EEntityName.ALBUM, EEntityName.ARTIST];

@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {
    undefined;
  }

  @Get()
  public async getFavorites() {
    const favorites = await this.favoriteService.getFavorites();

    return favorites;
  }

  @Post('/:entityName/:id')
  public async addToFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('entityName') entityName: EEntityName,
  ) {
    if (whitelist.includes(entityName)) {
      return this.favoriteService.addToFavs(entityName, id);
    } else {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('/:entityName/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeFromFavs(
    @Param('id') id: string,
    @Param('entityName') entityName: EEntityName,
  ) {
    if (whitelist.includes(entityName)) {
      return this.favoriteService.removeFromFavs(entityName, id);
    } else {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
