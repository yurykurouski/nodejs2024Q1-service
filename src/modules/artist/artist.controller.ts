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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArtistService } from './artist.service';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all artists',
    type: ArtistEntity,
    isArray: true,
  })
  public async getArtists() {
    return await this.artistService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single artist by id',
    type: ArtistEntity,
    isArray: false,
  })
  public async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.findOne(id);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create new artist',
    type: ArtistEntity,
    isArray: false,
  })
  public async createArtist(@Body() artistDTO: CreateArtistDTO) {
    return await this.artistService.create(artistDTO);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Update artist info',
    type: ArtistEntity,
    isArray: false,
  })
  async updateArtistInfo(
    @Body() artistDTO: UpdateArtistDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.artistService.update(id, artistDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete artist',
    type: null,
    isArray: false,
  })
  public async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.remove(id);
  }
}
