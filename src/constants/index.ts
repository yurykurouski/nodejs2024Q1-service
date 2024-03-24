import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from 'src/modules/artist/entities/artist.entity';
import { TrackEntity } from 'src/modules/track/entities/track.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { EDBEntryNames } from 'src/types';

export const MESSAGES = {
  NOT_FOUND: 'Item not found',
  CANT_VALIDATE_DATA: 'Can`t validate data',
  WRONG_DATA: 'Provided data is wrong',
  NO_ENTRY_FOUND: 'No entry found',
};

export const MODELS = {
  [EDBEntryNames.USERS]: UserEntity,
  [EDBEntryNames.ARTISTS]: ArtistEntity,
  [EDBEntryNames.ALBUMS]: AlbumEntity,
  [EDBEntryNames.TRACKS]: TrackEntity,
};
