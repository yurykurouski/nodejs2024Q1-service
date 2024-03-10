import { Album } from 'src/models/Album';
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

export interface ICreateArtistDTO extends IBaseDTO {
  name: string;
  grammy: boolean;
}

export interface ICreateAlbumDTO extends IBaseDTO {
  name: string;
  year: number;
  artistId: string;
}

export enum EDBEntryNames {
  ARTISTS = 'artists',
  USERS = 'users',
  TRACKS = 'tracks',
  ALBUMS = 'albums',
  FAVORITES = 'favorites',
}

export type TModelType = User | Artist | Track | Album;

export enum EEntityName {
  TRACK = 'track',
  ALBUM = 'album',
  ARTIST = 'artist',
}

export enum ETrackRefEntry {
  ARTIST_ID = 'artistId',
  ALBUM_ID = 'albumId',
}
