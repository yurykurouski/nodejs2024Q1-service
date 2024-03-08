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
import { ArtistService } from './artist.service';
import { ICreateArtistDTO } from 'src/types';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {
    undefined;
  }

  @Get()
  public async getArtists() {
    const artists = await this.artistService.getArtists();

    return artists;
  }

  @Get('/:id')
  public async getArtistById(@Param('id') id: string) {
    const artist = this.artistService.getArtist(id);

    return artist;
  }

  @Post('')
  public async createArtist(@Body() trackDTO: ICreateArtistDTO) {
    return this.artistService.createArtist(trackDTO);
  }

  @Put('/:id')
  async updateArtistInfo(
    @Body() artistDTO: ICreateArtistDTO,
    @Param('id') id: string,
  ) {
    return this.artistService.updateArtist(id, artistDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
