import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { DbService } from './db/db.service';
import { TrackController } from './track/track.controller';
import { ArtistController } from './artist/artist.controller';
import { AlbumController } from './album/album.controller';
import { CommonService } from './common/common.service';
import { FavoriteController } from './favorite/favorite.controller';
import { FavoriteService } from './favorite/favorite.service';

@Module({
  imports: [],
  controllers: [
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavoriteController,
  ],
  providers: [DbService, CommonService, FavoriteService],
})
export class AppModule {}
