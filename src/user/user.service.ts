import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/common.service';
import { PwdDataDTO, UserDto } from 'src/dto';
import { User } from 'src/models/User';
import { EDBEntryNames, ICreateUserDTO, UpdatePasswordDto } from 'src/types';

@Injectable()
export class UserService extends CommonService {
  public async getUsers() {
    const users = await this.getInstances<User>(EDBEntryNames.USERS);

    return users;
  }

  public async getUser(id: string) {
    const user = await this.getInstanceById<User>(EDBEntryNames.USERS, id);

    return user;
  }

  public async createUser(userDTO: ICreateUserDTO) {
    const user = await this.createInstance<User>(
      EDBEntryNames.USERS,
      UserDto,
      userDTO,
    );

    return user;
  }

  public async updateUserPwd(id: string, pwdDataDTO: UpdatePasswordDto) {
    const updatePwd = (userInstance: User, dto: PwdDataDTO): User => {
      userInstance.updatePwd(dto);

      return userInstance;
    };

    const updatedUser = await this.updateInstance<User>(
      EDBEntryNames.USERS,
      id,
      PwdDataDTO,
      pwdDataDTO,
      updatePwd,
    );

    return updatedUser;
  }

  public async deleteUser(id: string) {
    return await this.deleteInstance<User>(EDBEntryNames.USERS, id);
  }
}
