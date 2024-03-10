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
import { EDBEntryNames, ETrackRefEntry } from 'src/types';
import { Artist } from 'src/db/models/Artist';
import { CommonService } from 'src/modules/common/common.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Artist')
@Controller('artist')
export class ArtistController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @ApiOkResponse({
    description: 'Get all artists',
    type: Artist,
    isArray: true,
  })
  @Get()
  public async getArtists() {
    const artists = await this.commonService.getInstances(
      EDBEntryNames.ARTISTS,
    );

    return artists;
  }
  @ApiOkResponse({
    description: 'Get single artist by id',
    type: Artist,
    isArray: false,
  })
  @Get('/:id')
  public async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.commonService.getInstanceById<Artist>(
      EDBEntryNames.ARTISTS,
      id,
    );

    return artist;
  }

  @ApiOkResponse({
    description: 'Create new artist',
    type: Artist,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  public async createArtist(@Body() artistDTO: CreateArtistDTO) {
    return this.commonService.createInstance<Artist>(
      EDBEntryNames.ARTISTS,
      artistDTO,
    );
  }

  @ApiOkResponse({
    description: 'Update artist info',
    type: Artist,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async updateArtistInfo(
    @Body() artistDTO: UpdateArtistDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateArtistnfo = (artistInstance: Artist, dto: UpdateArtistDTO) => {
      artistInstance.updateArtistInfo(dto);

      return artistInstance;
    };
    return this.commonService.updateInstance(
      EDBEntryNames.ARTISTS,
      id,
      artistDTO,
      updateArtistnfo,
    );
  }

  @ApiOkResponse({
    description: 'Delete artist',
    type: null,
    isArray: false,
  })
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
