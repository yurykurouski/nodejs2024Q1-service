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
import { EDBEntryNames, ICreateTrackDTO } from 'src/types';
import { CommonService } from 'src/common/common.service';
import { TrackDTO } from 'src/dto';
import { Track } from 'src/models/Track';

@Controller('track')
export class TrackController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @Get()
  public getTracks() {
    return this.commonService.getInstances(EDBEntryNames.TRACKS);
  }

  @Get('/:id')
  public getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.commonService.getInstanceById(EDBEntryNames.TRACKS, id);
  }

  @Post('')
  public async createTrack(@Body() trackDTO: ICreateTrackDTO) {
    return this.commonService.createInstance(
      EDBEntryNames.TRACKS,
      TrackDTO,
      trackDTO,
    );
  }

  @Put('/:id')
  async updateTrackInfo(
    @Body() trackDTO: ICreateTrackDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateTrackInfo = (trackInstance: Track, dto: TrackDTO) => {
      trackInstance.updateTrackInfo(dto);
      return trackInstance;
    };

    return this.commonService.updateInstance(
      EDBEntryNames.TRACKS,
      id,
      TrackDTO,
      trackDTO,
      updateTrackInfo,
    );
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.commonService.deleteInstance(EDBEntryNames.TRACKS, id);
  }
}
