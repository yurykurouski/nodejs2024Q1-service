import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class BaseDTO {
  _type: 'tdo';

  constructor() {
    this._type = 'tdo';
  }
}

export class UserDto extends BaseDTO {
  @IsString()
  public login: string;
  @IsString()
  public password: string;
}

export class PwdDataDTO extends BaseDTO {
  @IsString()
  public oldPassword: string;
  @IsString()
  public newPassword: string;
}

export class TrackDTO extends BaseDTO {
  @IsString()
  public name: string;
  @IsNumber()
  public duration: string;
  @IsString()
  @IsOptional()
  public artistId: string;
  @IsString()
  @IsOptional()
  public albumId: string;
}

export class ArtistDTO extends BaseDTO {
  @IsString()
  public name: string;
  @IsBoolean()
  public grammy: string;
}

export class AlbumDTO extends BaseDTO {
  @IsString()
  public name: string;
  @IsNumber()
  public year: number;
  @IsString()
  @IsOptional()
  public artistId: string;
}

export class FavoriteDTO extends BaseDTO {
  @IsString()
  public name: string;
  @IsNumber()
  public year: number;
  @IsString()
  public artistId: string;
}
