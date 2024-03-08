import { ICreateUserDTO } from 'src/types';
import { generateUUID } from '../utils';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MESSAGES } from 'src/constants';
import { PwdDataDTO } from 'src/dto';

export class User {
  public id: string;
  private _login: string;
  private _password: string;
  private _version: number;
  private _createdAt: number;
  private _updatedAt: number;

  constructor(userDTO: ICreateUserDTO) {
    this.id = generateUUID();
    this._login = userDTO.login;
    this._password = userDTO.password;
    this._version = 0;
    this._createdAt = Date.now();
    this._updatedAt = Date.now();
  }

  private get password() {
    return this._password;
  }

  public updatePwd(pwdData: PwdDataDTO) {
    if (pwdData.oldPassword === this.password) {
      this._password = pwdData.newPassword;
    } else {
      throw new HttpException(MESSAGES.WRONG_DATA, HttpStatus.FORBIDDEN);
    }
  }
}
