import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EDBEntryNames } from 'src/types';
import { CommonService } from 'src/common/common.service';
import { User } from 'src/models/User';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @ApiOkResponse({
    description: 'Get all users',
    type: User,
    isArray: true,
  })
  @Get()
  public async getUsers() {
    const users = await this.commonService.getInstances<User>(
      EDBEntryNames.USERS,
    );

    return users;
  }

  @ApiOkResponse({
    description: 'Get single user by id',
    type: User,
    isArray: false,
  })
  @Get('/:id')
  public async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.commonService.getInstanceById<User>(
      EDBEntryNames.USERS,
      id,
    );

    return user;
  }

  @ApiOkResponse({
    description: 'Create user (following DTO should be used) CreateUserDto',
    type: User,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  public async createUser(@Body() userDTO: CreateUserDTO) {
    const newUser = await this.commonService.createInstance<User>(
      EDBEntryNames.USERS,
      userDTO,
    );

    return newUser;
  }

  @ApiOkResponse({
    description: `Update user's password UpdatePasswordDto (with attributes)`,
    type: User,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  public async updateUserPwd(
    @Body() pwdDataDTO: UpdateUserPasswordDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updatePwd = (
      userInstance: User,
      dto: UpdateUserPasswordDTO,
    ): User => {
      userInstance.updatePwd(dto);
      return userInstance;
    };

    const user = await this.commonService.updateInstance<User>(
      EDBEntryNames.USERS,
      id,
      pwdDataDTO,
      updatePwd,
    );

    return user;
  }

  @ApiOkResponse({
    description: 'Delete user',
    type: null,
    isArray: false,
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.commonService.deleteInstance<User>(
      EDBEntryNames.USERS,
      id,
    );
  }
}
