import { ApiProperty } from '@nestjs/swagger';
import { generateUUID } from '../../utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { CreateUserDTO } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserPasswordDTO } from 'src/modules/user/dto/update-user-password.dto';

export class User {
  #password: string;

  @ApiProperty()
  public id: string;
  @ApiProperty()
  public login: string;
  @ApiProperty()
  public version: number;
  @ApiProperty()
  public createdAt: number;
  @ApiProperty()
  public updatedAt: number;

  constructor({ login, password }: CreateUserDTO) {
    this.#password = password;
    this.id = generateUUID();
    this.login = login;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }

  private get password() {
    return this.#password;
  }
  private set password(newPwd: string) {
    this.#password = newPwd;

    this.handleUpdate();
  }
  private handleUpdate() {
    ++this.version;
    this.updatedAt = Date.now();
  }

  public updatePwd(pwdData: UpdateUserPasswordDTO) {
    if (pwdData.oldPassword === this.password) {
      this.password = pwdData.newPassword;
    } else {
      throw new HttpException(MESSAGES.WRONG_DATA, HttpStatus.FORBIDDEN);
    }
  }
}
