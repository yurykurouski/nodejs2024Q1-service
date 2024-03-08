import { Artist } from 'src/models/Artist';
import { Track } from 'src/models/Track';
import { User } from 'src/models/User';

export interface IBaseDTO {
  undefined;
}
export interface ICreateUserDTO extends IBaseDTO {
  login: string;
  password: string;
}
export interface ICreateTrackDTO extends IBaseDTO {
  name: string;
  duration: number;
  artistId: string;
  albumId: string;
}

export interface UpdatePasswordDto extends IBaseDTO {
  oldPassword: string;
  newPassword: string;
}

export enum EDBEntryNames {
  ARTISTS = '_artists',
  USERS = '_users',
  TRACKS = '_tracks',
}

export type TDTOs = {
  [EDBEntryNames.USERS]: ICreateUserDTO;
};

export type TModelType = User | Artist | Track;
