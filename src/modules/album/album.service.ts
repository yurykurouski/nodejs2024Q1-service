import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AlbumEntity } from './entities/album.entity';
import { MESSAGES } from 'src/constants';
import { CreateAlbumDTO } from './dto/create-album.dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    return (await this.prisma.album.findMany()) as AlbumEntity[];
  }

  public async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return album as AlbumEntity;
    }
  }

  public async create(data: CreateAlbumDTO) {
    return (await this.prisma.album.create({ data })) as AlbumEntity;
  }

  public async update(id: string, data: CreateAlbumDTO) {
    try {
      return (await this.prisma.album.update({
        where: { id },
        data,
      })) as AlbumEntity;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  public async remove(id: string) {
    try {
      return (await this.prisma.album.delete({ where: { id } })) as AlbumEntity;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
