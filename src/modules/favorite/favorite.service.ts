import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SharedService } from 'src/modules/shared/shared-service/shared.service';
import { MESSAGES } from 'src/constants';
import { EDBEntryNames, EEntityName } from 'src/types';

const entriesMap = {
  [EEntityName.TRACK]: EDBEntryNames.TRACKS,
  [EEntityName.ALBUM]: EDBEntryNames.ALBUMS,
  [EEntityName.ARTIST]: EDBEntryNames.ARTISTS,
};

@Injectable()
export class FavoriteService {
  constructor(private sharedService: SharedService) {}

  public async getFavorites() {
    return await this.sharedService.dbService.getFaforites();
  }

  public async addToFavs(entityName: EEntityName, id: string) {
    const throwAltErr = () => {
      throw new HttpException(
        MESSAGES.NO_ENTRY_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    };

    await this.sharedService
      .getInstanceById(entriesMap[entityName], id, throwAltErr)
      .then(async () => {
        await this.sharedService.dbService.favorites.addToFavs(
          entriesMap[entityName],
          id,
        );
      });
  }

  public async removeFromFavs(entityName: EEntityName, id: string) {
    await this.sharedService
      .getInstanceById(entriesMap[entityName], id)
      .then(async () => {
        await this.sharedService.dbService.favorites.removeFromFavs(
          entriesMap[entityName],
          id,
        );
      });
  }
}
