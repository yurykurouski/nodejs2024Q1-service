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
import { EDBEntryName } from 'src/types';
import { SharedService } from 'src/modules/shared/shared-service/shared.service';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private sharedService: SharedService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all tracks',
    type: TrackEntity,
    isArray: true,
  })
  public async getTracks() {
    return this.sharedService.getInstances<TrackEntity>(EDBEntryName.TRACK);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single track by id',
    type: TrackEntity,
    isArray: false,
  })
  public async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.sharedService.getInstanceById<TrackEntity>(
      EDBEntryName.TRACK,
      id,
    );
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create new track',
    type: TrackEntity,
    isArray: false,
  })
  public async createTrack(@Body() trackDTO: CreateTrackDTO) {
    return this.sharedService.createInstance<TrackEntity>(
      EDBEntryName.TRACK,
      trackDTO,
    );
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Update track info',
    type: TrackEntity,
    isArray: false,
  })
  public async updateTrackInfo(
    @Body() trackDTO: UpdateTrackDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.sharedService.updateInstance(EDBEntryName.TRACK, id, trackDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete track',
    type: null,
    isArray: false,
  })
  public async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.sharedService.deleteInstanceWithRef<TrackEntity>(
      EDBEntryName.TRACK,
      id,
    );
  }
}
