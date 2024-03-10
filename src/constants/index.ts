import { Album } from 'src/db/models/Album';
import { Artist } from 'src/db/models/Artist';
import { Track } from 'src/db/models/Track';
import { User } from 'src/db/models/User';
import { EDBEntryNames } from 'src/types';

export const MESSAGES = {
  NOT_FOUND: 'Item not found',
  CANT_VALIDATE_DATA: 'Can`t validate data',
  WRONG_DATA: 'Provided data is wrong',
  NO_ENTRY_FOUND: 'No entry found',
};

export const MODELS = {
  [EDBEntryNames.USERS]: User,
  [EDBEntryNames.ARTISTS]: Artist,
  [EDBEntryNames.ALBUMS]: Album,
  [EDBEntryNames.TRACKS]: Track,
};
