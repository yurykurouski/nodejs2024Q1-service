import { Module } from '@nestjs/common';
import { UserController } from './modules/user/user.controller';
import { DbService } from './db/db.service';
import { TrackController } from './modules/track/track.controller';
import { ArtistController } from './modules/artist/artist.controller';
import { AlbumController } from './modules/album/album.controller';
import { CommonService } from './modules/common/common.service';
import { FavoriteController } from './modules/favorite/favorite.controller';
import { FavoriteService } from './modules/favorite/favorite.service';

@Module({
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
