import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { EEntityName } from 'src/types';
import { FavoriteService } from './favorite.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesEntity } from 'src/modules/favorite/entities/favorite.entity';

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
    @Param(
      'entityName',
      new ParseEnumPipe(EEntityName, {
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    entityName: EEntityName,
  ) {
    return this.favoriteService.addToFavs(entityName, id);
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
    @Param(
      'entityName',
      new ParseEnumPipe(EEntityName, {
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    entityName: EEntityName,
  ) {
    return this.favoriteService.removeFromFavs(entityName, id);
  }
}
