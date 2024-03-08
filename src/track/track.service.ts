import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CommonService } from 'src/common/common.service';
import { MESSAGES } from 'src/constants';
import { DbService } from 'src/db/db.service';
import { TrackDTO } from 'src/dto';
import { Track } from 'src/models/Track';
import { EDBEntryNames, ICreateTrackDTO } from 'src/types';

@Injectable()
export class TrackService extends CommonService {
  constructor(private dbService: DbService) {
    super();
  }

  public getTracks() {
    const users = this.dbService.getEntryInstancesByName<Track>(
      EDBEntryNames.TRACKS,
    );

    return users;
  }

  public getTrack(id: string) {
    this.validateUUID(id);

    const track = this.dbService.getEntryInstanceById<Track>(
      EDBEntryNames.TRACKS,
      id,
    );

    if (!track) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return track;
    }
  }

  public async createTrack(trackDTO: ICreateTrackDTO) {
    const user = plainToInstance(TrackDTO, trackDTO);

    return validate(user).then((errors) => {
      if (errors.length) {
        throw new HttpException(
          MESSAGES.CANT_VALIDATE_DATA,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const newTrack = this.dbService.addEntryInstance<Track>(
          EDBEntryNames.TRACKS,
          user,
        );

        return newTrack;
      }
    });
  }

  public async updateTrack(id: string, trackDTO: ICreateTrackDTO) {
    this.validateUUID(id);

    const track = this.dbService.getEntryInstanceById<Track>(
      EDBEntryNames.TRACKS,
      id,
    );

    if (!track) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      track.updateTrackInfo(trackDTO);

      return track;
    }
  }

  public async deleteTrack(id: string) {
    this.validateUUID(id);

    return this.dbService.deleteEntryInstance<Track>(EDBEntryNames.TRACKS, id);
  }
}
