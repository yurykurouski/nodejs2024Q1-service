import { ICreateUserDTO } from 'src/types';
import { generateUUID } from '../utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { PwdDataDTO } from 'src/dto';

export class User {
  #password: string;

  public id: string;
  public login: string;
  public version: number;
  public createdAt: number;
  public updatedAt: number;

  constructor({ login, password }: ICreateUserDTO) {
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

  public updatePwd(pwdData: PwdDataDTO) {
    if (pwdData.oldPassword === this.password) {
      this.password = pwdData.newPassword;
    } else {
      throw new HttpException(MESSAGES.WRONG_DATA, HttpStatus.FORBIDDEN);
    }
  }
}
