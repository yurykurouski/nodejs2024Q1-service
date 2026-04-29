import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateRefreshDTO } from './dto/update-refresh.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prismaService: PrismaService,
  ) {}

  public async createUser(data: CreateUserDTO) {
    try {
      return await this.userService.create(data);
    } catch {
      throw new HttpException(MESSAGES.WRONG_DATA, HttpStatus.FORBIDDEN);
    }
  }

  public async loginUser(data: CreateUserDTO) {
    const user = await this.userService.findByLogin(data);

    const isPdwSame = await bcrypt.compare(data.password, user?.password);

    if (!user || !isPdwSame) {
      throw new HttpException(MESSAGES.AUTH_FAILED, HttpStatus.FORBIDDEN);
    }

    const payload = { userId: user.id, login: user.login };

    const tokens = await this.signTokens(payload);

    this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  public async updateRefresh(updateRefreshDTO: UpdateRefreshDTO) {
    const token = await this.prismaService.token.findUnique({
      where: {
        refreshToken: updateRefreshDTO.refreshToken,
      },
    });

    if (!token) {
      throw new HttpException(MESSAGES.AUTH_FAILED, HttpStatus.FORBIDDEN);
    }

    //@ts-expect-error poor typization
    const { userId, login } = this.jwtService.decode(token.refreshToken);
    await this.prismaService.token.delete({ where: { userId } });

    const tokens = await this.signTokens({ userId, login });
    await this.updateRefreshToken(userId, tokens.refreshToken);

    return tokens;
  }

  public async signTokens(payload: { userId: string; login: string }) {
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    await this.prismaService.token.upsert({
      where: { userId },
      update: { refreshToken },
      create: { userId, refreshToken },
    });
  }
}
