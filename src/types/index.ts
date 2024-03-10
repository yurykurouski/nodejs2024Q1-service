import { Album } from 'src/models/Album';
import { Artist } from 'src/models/Artist';
import { Track } from 'src/models/Track';
import { User } from 'src/models/User';

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
