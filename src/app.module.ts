import { Module } from '@nestjs/common';
import { AlbumModule } from './modules/album/album.module';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { UserModule } from './modules/user/user.module';
import { FavoriteModule } from './modules/favorite/favorite.module';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule, UserModule, FavoriteModule],
})
export class AppModule {}
