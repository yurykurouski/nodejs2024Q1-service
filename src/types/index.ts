import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export enum EDBEntryName {
  ARTIST = 'artist',
  USER = 'user',
  TRACK = 'track',
  ALBUM = 'album',
  FAVORITE = 'favorite',
}

export type TEntityType = AlbumEntity | UserEntity | ArtistEntity | TrackEntity;

export enum EEntityName {
  TRACK = 'track',
  ALBUM = 'album',
  ARTIST = 'artist',
}

export enum ETrackRefEntry {
  ARTIST_ID = 'artistId',
  ALBUM_ID = 'albumId',
}

export type TFavoritesMapped = {
  [key in EDBEntryName]: TEntityType;
};
