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
import { EDBEntryNames, ETrackRefEntry, ICreateArtistDTO } from 'src/types';
import { ArtistDTO } from 'src/dto';
import { Artist } from 'src/models/Artist';
import { CommonService } from 'src/common/common.service';

@Controller('artist')
export class ArtistController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @Get()
  public async getArtists() {
    const artists = await this.commonService.getInstances(
      EDBEntryNames.ARTISTS,
    );

    return artists;
  }

  @Get('/:id')
  public async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.commonService.getInstanceById(
      EDBEntryNames.ARTISTS,
      id,
    );

    return artist;
  }

  @Post('')
  public async createArtist(@Body() trackDTO: ICreateArtistDTO) {
    return this.commonService.createInstance(
      EDBEntryNames.ARTISTS,
      ArtistDTO,
      trackDTO,
    );
  }

  @Put('/:id')
  async updateArtistInfo(
    @Body() artistDTO: ICreateArtistDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateArtistnfo = (artistInstance: Artist, dto: ArtistDTO) => {
      artistInstance.updateArtistInfo(dto);

      return artistInstance;
    };
    return this.commonService.updateInstance(
      EDBEntryNames.ARTISTS,
      id,
      ArtistDTO,
      artistDTO,
      updateArtistnfo,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.commonService.deleteInstanceWithRef(
      EDBEntryNames.ARTISTS,
      id,
      ETrackRefEntry.ARTIST_ID,
      [EDBEntryNames.TRACKS, EDBEntryNames.ALBUMS],
    );
  }
}
