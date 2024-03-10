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
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
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
    type: ArtistEntity,
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
    type: ArtistEntity,
    isArray: false,
  })
  @Get('/:id')
  public async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    const artist = this.commonService.getInstanceById<ArtistEntity>(
      EDBEntryNames.ARTISTS,
      id,
    );

    return artist;
  }

  @ApiOkResponse({
    description: 'Create new artist',
    type: ArtistEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  public async createArtist(@Body() artistDTO: CreateArtistDTO) {
    return this.commonService.createInstance<ArtistEntity>(
      EDBEntryNames.ARTISTS,
      artistDTO,
    );
  }

  @ApiOkResponse({
    description: 'Update artist info',
    type: ArtistEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  async updateArtistInfo(
    @Body() artistDTO: UpdateArtistDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateArtistnfo = (
      artistInstance: ArtistEntity,
      dto: UpdateArtistDTO,
    ) => {
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
