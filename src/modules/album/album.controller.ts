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
import { EDBEntryName, ETrackRefEntry } from 'src/types';
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { SharedService } from 'src/modules/shared/shared-service/shared.service';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('album')
@ApiTags('Album')
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
    return this.sharedService.getInstances<AlbumEntity>(EDBEntryName.ALBUM);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single album by id',
    type: AlbumEntity,
    isArray: false,
  })
  public async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.sharedService.getInstanceById<AlbumEntity>(
      EDBEntryName.ALBUM,
      id,
    );
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create new album',
    type: AlbumEntity,
    isArray: false,
  })
  public async createAlbum(@Body() albumDTO: CreateAlbumDTO) {
    return this.sharedService.createInstance<AlbumEntity>(
      EDBEntryName.ALBUM,
      albumDTO,
    );
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Update album info',
    type: AlbumEntity,
  })
  public async updateAlbumInfo(
    @Body() albumDTO: CreateAlbumDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.sharedService.updateInstance<AlbumEntity>(
      EDBEntryName.ALBUM,
      id,
      albumDTO,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete album',
    type: AlbumEntity,
    status: HttpStatus.NO_CONTENT,
  })
  public async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sharedService.deleteInstanceWithRef<AlbumEntity>(
      EDBEntryName.ALBUM,
      id,
      ETrackRefEntry.ALBUM_ID,
      [EDBEntryName.TRACK],
    );
  }
}
