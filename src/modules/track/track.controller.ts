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
import { EDBEntryNames } from 'src/types';
import { CommonService } from 'src/modules/common/common.service';
import { Track } from 'src/db/models/Track';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @ApiOkResponse({
    description: 'Get all tracks',
    type: Track,
    isArray: true,
  })
  @Get()
  public async getTracks() {
    return await this.commonService.getInstances<Track>(EDBEntryNames.TRACKS);
  }

  @ApiOkResponse({
    description: 'Get single track by id',
    type: Track,
    isArray: false,
  })
  @Get('/:id')
  public async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.commonService.getInstanceById<Track>(
      EDBEntryNames.TRACKS,
      id,
    );
  }

  @ApiOkResponse({
    description: 'Create new track',
    type: Track,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  public async createTrack(@Body() trackDTO: CreateTrackDTO) {
    return this.commonService.createInstance<Track>(
      EDBEntryNames.TRACKS,
      trackDTO,
    );
  }

  @ApiOkResponse({
    description: 'Update track info',
    type: Track,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  public async updateTrackInfo(
    @Body() trackDTO: UpdateTrackDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateTrackInfo = (trackInstance: Track, dto: UpdateTrackDTO) => {
      trackInstance.updateTrackInfo(dto);
      return trackInstance;
    };

    return this.commonService.updateInstance(
      EDBEntryNames.TRACKS,
      id,
      trackDTO,
      updateTrackInfo,
    );
  }

  @ApiOkResponse({
    description: 'Delete track',
    type: null,
    isArray: false,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.commonService.deleteInstance<Track>(
      EDBEntryNames.TRACKS,
      id,
    );
  }
}
