import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService],
})
export class ArtistModule {}
