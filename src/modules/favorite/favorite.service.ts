import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommonService } from 'src/modules/common/common.service';
import { MESSAGES } from 'src/constants';
import { EDBEntryNames, EEntityName } from 'src/types';

const entriesMap = {
  [EEntityName.TRACK]: EDBEntryNames.TRACKS,
  [EEntityName.ALBUM]: EDBEntryNames.ALBUMS,
  [EEntityName.ARTIST]: EDBEntryNames.ARTISTS,
};

@Injectable()
export class FavoriteService extends CommonService {
  public async getFavorites() {
    return await this.dbService.getFaforites();
  }
  public async addToFavs(entityName: EEntityName, id: string) {
    const throwAltErr = () => {
      throw new HttpException(
        MESSAGES.NO_ENTRY_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    };

    await this.getInstanceById(entriesMap[entityName], id, throwAltErr).then(
      async () => {
        await this.dbService.favorites.addToFavs(entriesMap[entityName], id);
      },
    );
  }

  public async removeFromFavs(entityName: EEntityName, id: string) {
    await this.getInstanceById(entriesMap[entityName], id).then(async () => {
      await this.dbService.favorites.removeFromFavs(entriesMap[entityName], id);
    });
  }
}
