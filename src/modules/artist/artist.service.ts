import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MESSAGES } from 'src/constants';
import { ArtistEntity } from './entities/artist.entity';
import { CreateArtistDTO } from './dto/create-artist.dto';
import { UpdateArtistDTO } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    return (await this.prisma.artist.findMany()) as ArtistEntity[];
  }

  public async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return artist as ArtistEntity;
    }
  }

  public async create(data: CreateArtistDTO) {
    return (await this.prisma.artist.create({ data })) as ArtistEntity;
  }

  public async update(id: string, data: UpdateArtistDTO) {
    try {
      return (await this.prisma.artist.update({
        where: { id },
        data,
      })) as ArtistEntity;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  public async remove(id: string) {
    try {
      return (await this.prisma.artist.delete({
        where: { id },
      })) as ArtistEntity;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
