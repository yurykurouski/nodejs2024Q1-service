export interface ICreateUserDTO {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export enum EDBEntryNames {
  ARTISTS = '_artists',
  USERS = '_users',
}

export type TDTOs = {
  [EDBEntryNames.USERS]: ICreateUserDTO;
};
