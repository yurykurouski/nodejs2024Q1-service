import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MESSAGES } from 'src/constants';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDTO } from './dto/create-track.dto';
import { UpdateTrackDTO } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    return (await this.prisma.track.findMany()) as TrackEntity[];
  }

  public async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return track as TrackEntity;
    }
  }

  public async create(data: CreateTrackDTO) {
    return (await this.prisma.track.create({ data })) as TrackEntity;
  }

  public async update(id: string, data: UpdateTrackDTO) {
    try {
      return (await this.prisma.track.update({
        where: { id },
        data,
      })) as TrackEntity;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  public async remove(id: string) {
    try {
      return (await this.prisma.track.delete({ where: { id } })) as TrackEntity;
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
