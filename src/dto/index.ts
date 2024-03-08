import { IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  public login: string;
  @IsString()
  public password: string;
}

export class PwdDataDTO {
  @IsString()
  public oldPassword: string;
  @IsString()
  public newPassword: string;
}

export class TrackDTO {
  @IsString()
  public name: string;
  @IsNumber()
  public duration: string;
  @IsString()
  public artistId: string;
  @IsString()
  public albumId: string;
}
