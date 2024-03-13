import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { MESSAGES } from 'src/constants';

@Injectable()
export class USerService {
  constructor(private prisma: PrismaService) {}

  public async updateUserPwd(id: string, data: UpdateUserPasswordDTO) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (user) {
      if (user.password === data.oldPassword) {
        const newData = {
          ...user,
          password: data.newPassword,
        };

        await this.prisma.user.update({
          where: { id },
          data: newData,
        });

        return newData;
      } else {
        throw new HttpException(MESSAGES.WRONG_DATA, HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
