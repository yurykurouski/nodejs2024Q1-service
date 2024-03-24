import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  ValidationPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { EDBEntryNames, ETrackRefEntry } from 'src/types';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { SharedService } from 'src/modules/shared/shared-service/shared.service';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private sharedService: SharedService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all albums',
    type: AlbumEntity,
    isArray: true,
  })
  public async getAlbums() {
    const albums = await this.sharedService.getInstances<AlbumEntity>(
      EDBEntryNames.ALBUMS,
    );

    return albums;
  }

  @ApiOkResponse({
    description: 'Get single album by id',
    type: AlbumEntity,
    isArray: false,
  })
  @Get('/:id')
  public async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.sharedService.getInstanceById<AlbumEntity>(
      EDBEntryNames.ALBUMS,
      id,
    );

    return album;
  }

  @ApiOkResponse({
    description: 'Create new album',
    type: AlbumEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  public async createAlbum(@Body() albumDTO: CreateAlbumDTO) {
    const newAlbum = await this.sharedService.createInstance<AlbumEntity>(
      EDBEntryNames.ALBUMS,
      albumDTO,
    );

    return newAlbum;
  }

  @ApiOkResponse({
    description: 'Update album info',
    type: AlbumEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  public async updateAlbumInfo(
    @Body() albumDTO: CreateAlbumDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateAlbumInfo = (
      albumInstance: AlbumEntity,
      dto: CreateAlbumDTO,
    ) => {
      albumInstance.updateAlbumInfo(dto);

      return albumInstance;
    };

    const updatedAlbum = await this.sharedService.updateInstance(
      EDBEntryNames.ALBUMS,
      id,
      albumDTO,
      updateAlbumInfo,
    );

    return updatedAlbum;
  }

  @ApiOkResponse({
    description: 'Delete album',
    type: null,
    isArray: false,
    status: HttpStatus.NO_CONTENT,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sharedService.deleteInstanceWithRef<AlbumEntity>(
      EDBEntryNames.ALBUMS,
      id,
      ETrackRefEntry.ALBUM_ID,
      [EDBEntryNames.TRACKS],
    );
  }
}
