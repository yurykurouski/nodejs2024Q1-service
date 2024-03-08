import { Album } from 'src/models/Album';
import { Artist } from 'src/models/Artist';
import { Track } from 'src/models/Track';
import { User } from 'src/models/User';
import { EDBEntryNames } from 'src/types';

export const MESSAGES = {
  NOT_UUID: 'Provided id is invalid (not UUID format)',
  NOT_FOUND: 'Nothing found',
  CANT_VALIDATE_DATA: 'Can`t validate data',
  WRONG_DATA: 'Provided data is wrong',
};

export const MODELS = {
  [EDBEntryNames.USERS]: User,
  [EDBEntryNames.ARTISTS]: Artist,
  [EDBEntryNames.ALBUMS]: Album,
  [EDBEntryNames.TRACKS]: Track,
};
