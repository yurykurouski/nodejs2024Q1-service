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
import { SharedService } from 'src/modules/shared/shared-service/shared.service';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Track')
@Controller('track')
export class TrackController {
  constructor(private sharedService: SharedService) {
    undefined;
  }

  @ApiOkResponse({
    description: 'Get all tracks',
    type: TrackEntity,
    isArray: true,
  })
  @Get()
  public async getTracks() {
    return await this.sharedService.getInstances<TrackEntity>(
      EDBEntryNames.TRACKS,
    );
  }

  @ApiOkResponse({
    description: 'Get single track by id',
    type: TrackEntity,
    isArray: false,
  })
  @Get('/:id')
  public async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.sharedService.getInstanceById<TrackEntity>(
      EDBEntryNames.TRACKS,
      id,
    );
  }

  @ApiOkResponse({
    description: 'Create new track',
    type: TrackEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  public async createTrack(@Body() trackDTO: CreateTrackDTO) {
    return this.sharedService.createInstance<TrackEntity>(
      EDBEntryNames.TRACKS,
      trackDTO,
    );
  }

  @ApiOkResponse({
    description: 'Update track info',
    type: TrackEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  public async updateTrackInfo(
    @Body() trackDTO: UpdateTrackDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updateTrackInfo = (
      trackInstance: TrackEntity,
      dto: UpdateTrackDTO,
    ) => {
      trackInstance.updateTrackInfo(dto);
      return trackInstance;
    };

    return this.sharedService.updateInstance(
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
    return await this.sharedService.deleteInstance<TrackEntity>(
      EDBEntryNames.TRACKS,
      id,
    );
  }
}
