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
import { CommonService } from 'src/modules/common/common.service';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all albums',
    type: AlbumEntity,
    isArray: true,
  })
  public async getAlbums() {
    const albums = await this.commonService.getInstances(EDBEntryNames.ALBUMS);

    return albums;
  }

  @ApiOkResponse({
    description: 'Get single album by id',
    type: AlbumEntity,
    isArray: false,
  })
  @Get('/:id')
  public async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.commonService.getInstanceById(EDBEntryNames.ALBUMS, id);

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
    const newAlbum = await this.commonService.createInstance<AlbumEntity>(
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

    const updatedAlbum = await this.commonService.updateInstance(
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
    return await this.commonService.deleteInstanceWithRef(
      EDBEntryNames.ALBUMS,
      id,
      ETrackRefEntry.ALBUM_ID,
      [EDBEntryNames.TRACKS],
    );
  }
}
