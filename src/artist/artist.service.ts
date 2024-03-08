import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { ArtistDTO } from 'src/dto';
import { Artist } from 'src/models/Artist';
import { EDBEntryNames, ICreateArtistDTO } from 'src/types';

@Injectable()
export class ArtistService extends CommonService {
  public async getArtists() {
    const artists = await this.getInstances(EDBEntryNames.ARTISTS);

    return artists;
  }

  public async getArtist(id: string) {
    const artist = await this.getInstanceById(EDBEntryNames.ARTISTS, id);

    return artist;
  }

  public async createArtist(artistDTO: ICreateArtistDTO) {
    const newArtist = await this.createInstance(
      EDBEntryNames.ARTISTS,
      ArtistDTO,
      artistDTO,
    );

    return newArtist;
  }

  public async updateArtist(id: string, artistDTO: ICreateArtistDTO) {
    const updateArtistnfo = (artistInstance: Artist, dto: ArtistDTO) => {
      artistInstance.updateArtistInfo(dto);

      return artistInstance;
    };

    const updatedArtist = await this.updateInstance(
      EDBEntryNames.ARTISTS,
      id,
      ArtistDTO,
      artistDTO,
      updateArtistnfo,
    );

    return updatedArtist;
  }

  public async deleteArtist(id: string) {
    return await this.deleteInstance(EDBEntryNames.ARTISTS, id);
  }
}
