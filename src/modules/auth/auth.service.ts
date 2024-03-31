import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
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
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
