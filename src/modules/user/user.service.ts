import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { MESSAGES } from 'src/constants';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  public async findAll() {
    return await this.prisma.user.findMany();
  }

  public async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return user;
    }
  }

  public async create(data: CreateUserDTO) {
    return await this.prisma.user.create({ data });
  }

  public async updateUserPwd(id: string, data: UpdateUserPasswordDTO) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      if (user.password === data.oldPassword) {
        return await this.prisma.user.update({
          where: { id },
          data: { password: data.newPassword, version: { increment: 1 } },
        });
      } else {
        throw new HttpException(MESSAGES.WRONG_DATA, HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  public async remove(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
