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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesEntity } from 'src/modules/favorite/entities/favorite.entity';

const whitelist = [EEntityName.TRACK, EEntityName.ALBUM, EEntityName.ARTIST];

@ApiTags('Favorites')
@Controller('favs')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {
    undefined;
  }

  @ApiOkResponse({
    description: 'get all favorites',
    type: FavoritesEntity,
    isArray: true,
  })
  @Get()
  public async getFavorites() {
    const favorites = await this.favoriteService.getFavorites();

    return favorites;
  }

  @ApiOkResponse({
    description: 'Add entity to the favorites',
    type: null,
    isArray: false,
  })
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

  @ApiOkResponse({
    description: 'Delete entity from the favorites',
    type: null,
    isArray: false,
    status: HttpStatus.NO_CONTENT,
  })
  @Delete('/:entityName/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeFromFavs(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('entityName') entityName: EEntityName,
  ) {
    if (whitelist.includes(entityName)) {
      return this.favoriteService.removeFromFavs(entityName, id);
    } else {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
