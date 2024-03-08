export interface ICreateUserDTO {
  login: string;
  password: string;
}
export interface ICreateTrackDTO {
  name: string;
  duration: number;
  artistId: string;
  albumId: string;
}

export interface UpdatePasswordDto {
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
