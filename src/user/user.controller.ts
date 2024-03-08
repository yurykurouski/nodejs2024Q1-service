import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EDBEntryNames, ICreateUserDTO, UpdatePasswordDto } from 'src/types';
import { CommonService } from 'src/common/common.service';
import { PwdDataDTO, UserDto } from 'src/dto';
import { User } from 'src/models/User';

@Controller('user')
export class UserController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @Get()
  public async getUsers() {
    const users = await this.commonService.getInstances<User>(
      EDBEntryNames.USERS,
    );

    return users;
  }

  @Get('/:id')
  public async getUser(@Param('id') id: string) {
    const user = await this.commonService.getInstanceById<User>(
      EDBEntryNames.USERS,
      id,
    );

    return user;
  }

  @Post('')
  public async createUser(@Body() userDTO: ICreateUserDTO) {
    const newUser = await this.commonService.createInstance<User>(
      EDBEntryNames.USERS,
      UserDto,
      userDTO,
    );

    return newUser;
  }

  @Put('/:id')
  public async updateUserPwd(
    @Body() pwdDataDTO: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    const updatePwd = (userInstance: User, dto: PwdDataDTO): User => {
      userInstance.updatePwd(dto);
      return userInstance;
    };

    const user = await this.commonService.updateInstance<User>(
      EDBEntryNames.USERS,
      id,
      PwdDataDTO,
      pwdDataDTO,
      updatePwd,
    );

    return user;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('id') id: string) {
    return await this.commonService.deleteInstance<User>(
      EDBEntryNames.USERS,
      id,
    );
  }
}
