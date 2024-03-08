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
import { TrackService } from './track.service';
import { ICreateTrackDTO } from 'src/types';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {
    undefined;
  }

  @Get()
  public getTracks() {
    return this.trackService.getTracks();
  }

  @Get('/:id')
  public getTrack(@Param('id') id: string) {
    return this.trackService.getTrack(id);
  }

  @Post('')
  public async createTrack(@Body() trackDTO: ICreateTrackDTO) {
    return this.trackService.createTrack(trackDTO);
  }

  @Put('/:id')
  async updateTrackInfo(
    @Body() trackDTO: ICreateTrackDTO,
    @Param('id') id: string,
  ) {
    return this.trackService.updateTrack(id, trackDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
