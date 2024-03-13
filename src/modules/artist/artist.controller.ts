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
import { EDBEntryName, ETrackRefEntry } from 'src/types';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { SharedService } from 'src/modules/shared/shared-service/shared.service';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private sharedService: SharedService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all artists',
    type: ArtistEntity,
    isArray: true,
  })
  public async getArtists() {
    const artists = await this.sharedService.getInstances<ArtistEntity>(
      EDBEntryName.ARTIST,
    );

    return artists;
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single artist by id',
    type: ArtistEntity,
    isArray: false,
  })
  public async getArtistById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sharedService.getInstanceById<ArtistEntity>(
      EDBEntryName.ARTIST,
      id,
    );
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create new artist',
    type: ArtistEntity,
    isArray: false,
  })
  public async createArtist(@Body() artistDTO: CreateArtistDTO) {
    return this.sharedService.createInstance<ArtistEntity>(
      EDBEntryName.ARTIST,
      artistDTO,
    );
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
    return this.sharedService.updateInstance(
      EDBEntryName.ARTIST,
      id,
      artistDTO,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete artist',
    type: null,
    isArray: false,
  })
  public async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sharedService.deleteInstanceWithRef<ArtistEntity>(
      EDBEntryName.ARTIST,
      id,
      ETrackRefEntry.ARTIST_ID,
      [EDBEntryName.TRACK, EDBEntryName.ALBUM],
    );
  }
}
