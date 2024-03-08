import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EDBEntryNames, ICreateAlbumDTO } from 'src/types';
import { AlbumDTO } from 'src/dto';
import { Album } from 'src/models/Album';
import { CommonService } from 'src/common/common.service';

@Controller('album')
export class AlbumController {
  constructor(private albumService: CommonService) {
    undefined;
  }

  @Get()
  public async getAlbums() {
    const albums = await this.albumService.getInstances(EDBEntryNames.ALBUMS);

    return albums;
  }

  @Get('/:id')
  public async getAlbum(@Param('id') id: string) {
    const album = this.albumService.getInstanceById(EDBEntryNames.ALBUMS, id);

    return album;
  }

  @Post('')
  public async createAlbum(@Body() albumDTO: ICreateAlbumDTO) {
    const newAlbum = await this.albumService.createInstance(
      EDBEntryNames.ALBUMS,
      AlbumDTO,
      albumDTO,
    );

    return newAlbum;
  }

  @Put('/:id')
  public async updateAlbumInfo(
    @Body() albumDTO: ICreateAlbumDTO,
    @Param('id') id: string,
  ) {
    const updateAlbumInfo = (albumInstance: Album, dto: AlbumDTO) => {
      albumInstance.updateAlbumInfo(dto);
    };

    const updatedAlbum = await this.albumService.updateInstance(
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
  public async deleteAlbum(@Param('id') id: string) {
    return await this.albumService.deleteInstance(EDBEntryNames.ALBUMS, id);
  }
}
