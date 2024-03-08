import { IsNumber, IsString } from 'class-validator';

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
  public artistId: string;
  @IsString()
  public albumId: string;
}
