import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export enum EDBEntryNames {
  ARTISTS = 'artists',
  USERS = 'users',
  TRACKS = 'tracks',
  ALBUMS = 'albums',
  FAVORITES = 'favorites',
}

export type TModelType = UserEntity | ArtistEntity | TrackEntity | AlbumEntity;

export enum EEntityName {
  TRACK = 'track',
  ALBUM = 'album',
  ARTIST = 'artist',
}

export enum ETrackRefEntry {
  ARTIST_ID = 'artistId',
  ALBUM_ID = 'albumId',
}
