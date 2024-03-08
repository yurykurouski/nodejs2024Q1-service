import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { MESSAGES } from 'src/constants';
import { DbService } from 'src/db/db.service';
import { PwdDataDTO, UserDto } from 'src/dto';
import { User } from 'src/models/User';
import { EDBEntryNames, ICreateUserDTO, UpdatePasswordDto } from 'src/types';
import { isValidUUID } from 'src/utils';

@Injectable()
export class CommonController {
  public validateUUID(uuid: string) {
    if (!isValidUUID(uuid)) {
      throw new HttpException(MESSAGES.NOT_UUID, HttpStatus.BAD_REQUEST);
    }
  }
}

@Injectable()
export class UserService extends CommonController {
  constructor(private dbService: DbService) {
    super();
  }

  public getUsers() {
    const users = this.dbService.getEntryInstancesByName<User>(
      EDBEntryNames.USERS,
    );

    return users;
  }

  public getUser(id: string) {
    this.validateUUID(id);

    const userFound = this.dbService.getEntryInstanceById<User>(
      EDBEntryNames.USERS,
      id,
    );

    if (!userFound) {
      throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
    } else {
      return userFound;
    }
  }

  public async createUser(userDTO: ICreateUserDTO) {
    const user = plainToInstance(UserDto, userDTO);

    return validate(user).then((errors) => {
      if (errors.length) {
        throw new HttpException(
          MESSAGES.CANT_VALIDATE_DATA,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const newUser = this.dbService.addEntryInstance<User>(
          EDBEntryNames.USERS,
          user,
        );

        return newUser;
      }
    });
  }

  public async updateUserPwd(id: string, pwdDataDTO: UpdatePasswordDto) {
    this.validateUUID(id);

    const pwdData = plainToInstance(PwdDataDTO, pwdDataDTO);

    return validate(pwdData).then((errors) => {
      if (errors.length) {
        throw new HttpException(
          MESSAGES.CANT_VALIDATE_DATA,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const user = this.dbService.getEntryInstanceById<User>(
          EDBEntryNames.USERS,
          id,
        );

        if (!user) {
          throw new HttpException(MESSAGES.NOT_FOUND, HttpStatus.NOT_FOUND);
        } else {
          user.updatePwd(pwdData);

          return user;
        }
      }
    });
  }

  public deleteUser(id: string) {
    this.validateUUID(id);

    return this.dbService.deleteEntryInstance<User>(EDBEntryNames.USERS, id);
  }
}
