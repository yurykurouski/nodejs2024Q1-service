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
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TrackService } from './track.service';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private trackService: TrackService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all tracks',
    type: TrackEntity,
    isArray: true,
  })
  public async getTracks() {
    return await this.trackService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single track by id',
    type: TrackEntity,
    isArray: false,
  })
  public async getTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.findOne(id);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create new track',
    type: TrackEntity,
    isArray: false,
  })
  public async createTrack(@Body() trackDTO: CreateTrackDTO) {
    return await this.trackService.create(trackDTO);
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
    return await this.trackService.update(id, trackDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete track',
    type: null,
    isArray: false,
  })
  public async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.remove(id);
  }
}
