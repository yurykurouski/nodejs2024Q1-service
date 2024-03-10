import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EDBEntryNames, ETrackRefEntry, ICreateAlbumDTO } from 'src/types';
import { AlbumDTO } from 'src/dto';
import { Album } from 'src/models/Album';
import { CommonService } from 'src/common/common.service';

@Controller('album')
export class AlbumController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @Get()
  public async getAlbums() {
    const albums = await this.commonService.getInstances(EDBEntryNames.ALBUMS);

    return albums;
  }

  @Get('/:id')
  public async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.commonService.getInstanceById(EDBEntryNames.ALBUMS, id);

    return album;
  }

  @Post('')
  public async createAlbum(@Body() albumDTO: ICreateAlbumDTO) {
    const newAlbum = await this.commonService.createInstance(
      EDBEntryNames.ALBUMS,
      AlbumDTO,
      albumDTO,
    );

    return newAlbum;
  }

  @Put('/:id')
  public async updateAlbumInfo(
    @Body() albumDTO: ICreateAlbumDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateAlbumInfo = (albumInstance: Album, dto: AlbumDTO) => {
      albumInstance.updateAlbumInfo(dto);

      return albumInstance;
    };

    const updatedAlbum = await this.commonService.updateInstance(
      EDBEntryNames.ALBUMS,
      id,
      AlbumDTO,
      albumDTO,
      updateAlbumInfo,
    );

    return updatedAlbum;
  }

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
