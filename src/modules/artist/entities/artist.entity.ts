import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDTO } from 'src/modules/artist/dto/create-artist.dto';
import { UpdateArtistDTO } from 'src/modules/artist/dto/update-artist.dto';
import { generateUUID } from 'src/utils';

export class ArtistEntity {
  @ApiProperty()
  public id: string;
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public grammy: boolean;

  constructor({ name, grammy }: CreateArtistDTO) {
    this.id = generateUUID();
    this.name = name;
    this.grammy = grammy;
  }

  public updateArtistInfo({ name, grammy }: UpdateArtistDTO) {
    this.name = name;
    this.grammy = grammy;
  }
}
