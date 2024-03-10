import { Album } from 'src/db/models/Album';
import { Artist } from 'src/db/models/Artist';
import { Track } from 'src/db/models/Track';
import { User } from 'src/db/models/User';

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
