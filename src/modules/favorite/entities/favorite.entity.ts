import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class FavoritesEntity {
  @ApiProperty()
  public artists: string[];
  @ApiProperty()
  public albums: string[];
  @ApiProperty()
  public tracks: string[];
  @Exclude()
  favoritesId: string;

  constructor(data: FavoritesEntity) {
    Object.assign(this, data);
  }
}
