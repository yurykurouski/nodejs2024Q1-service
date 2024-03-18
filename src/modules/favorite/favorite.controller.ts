import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { EEntityName } from 'src/types';
import { FavoriteService } from './favorite.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FavoritesEntity } from 'src/modules/favorite/entities/favorite.entity';
import { FavoritesInterceptor } from './favorite.interceptor';

@Controller('favs')
@UseInterceptors(FavoritesInterceptor)
@ApiTags('Favorites')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'get all favorites',
    type: FavoritesEntity,
    isArray: true,
  })
  public async getFavorites() {
    return await this.favoriteService.getFavorites();
  }

  @Post('/:entityName/:id')
  @ApiOkResponse({
    description: 'Add entity to the favorites',
    type: null,
  })
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
    return await this.favoriteService.addToFavs(entityName, id);
  }

  @Delete('/:entityName/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete entity from the favorites',
    type: null,
    isArray: false,
    status: HttpStatus.NO_CONTENT,
  })
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
    return await this.favoriteService.removeFromFavs(entityName, id);
  }
}
