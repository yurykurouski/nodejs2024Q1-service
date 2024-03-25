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
import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { CreateAlbumDTO } from './dto/create-album.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AlbumService } from './album.service';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private albumService: AlbumService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all albums',
    type: AlbumEntity,
    isArray: true,
  })
  public async getAlbums() {
    return await this.albumService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single album by id',
    type: AlbumEntity,
    isArray: false,
  })
  public async getAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.findOne(id);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create new album',
    type: AlbumEntity,
    isArray: false,
  })
  public async createAlbum(@Body() albumDTO: CreateAlbumDTO) {
    return await this.albumService.create(albumDTO);
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
    return await this.albumService.update(id, albumDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete album',
    type: AlbumEntity,
    status: HttpStatus.NO_CONTENT,
  })
  public async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumService.remove(id);
  }
}
