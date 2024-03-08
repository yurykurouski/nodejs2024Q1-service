import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { TrackDTO } from 'src/dto';
import { Track } from 'src/models/Track';
import { EDBEntryNames, ICreateTrackDTO } from 'src/types';

@Injectable()
export class TrackService extends CommonService {
  public async getTracks() {
    const tracks = await this.getInstances(EDBEntryNames.TRACKS);

    return tracks;
  }

  public async getTrack(id: string) {
    const track = await this.getInstanceById(EDBEntryNames.TRACKS, id);

    return track;
  }

  public async createTrack(trackDTO: ICreateTrackDTO) {
    const newTrack = await this.createInstance(
      EDBEntryNames.TRACKS,
      TrackDTO,
      trackDTO,
    );

    return newTrack;
  }

  public async updateTrack(id: string, trackDTO: ICreateTrackDTO) {
    const updateTrackInfo = (trackInstance: Track, dto: TrackDTO) => {
      trackInstance.updateTrackInfo(dto);
    };

    const updatedTrack = await this.updateInstance(
      EDBEntryNames.TRACKS,
      id,
      TrackDTO,
      trackDTO,
      updateTrackInfo,
    );

    return updatedTrack;
  }

  public async deleteTrack(id: string) {
    return await this.deleteInstance(EDBEntryNames.TRACKS, id);
  }
}
