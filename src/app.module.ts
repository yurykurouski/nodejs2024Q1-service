import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
    AppController,
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavoriteController,
  ],
  providers: [AppService, DbService, CommonService, FavoriteService],
})
export class AppModule {}
