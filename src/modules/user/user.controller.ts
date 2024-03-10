import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EDBEntryNames } from 'src/types';
import { CommonService } from 'src/modules/common/common.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private commonService: CommonService) {
    undefined;
  }

  @ApiOkResponse({
    description: 'Get all users',
    type: UserEntity,
    isArray: true,
  })
  @Get()
  public async getUsers() {
    const users = await this.commonService.getInstances<UserEntity>(
      EDBEntryNames.USERS,
    );

    return users;
  }

  @ApiOkResponse({
    description: 'Get single user by id',
    type: UserEntity,
    isArray: false,
  })
  @Get('/:id')
  public async getUser(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.commonService.getInstanceById<UserEntity>(
      EDBEntryNames.USERS,
      id,
    );

    return user;
  }

  @ApiOkResponse({
    description: 'Create user (following DTO should be used) CreateUserDto',
    type: UserEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Post('')
  public async createUser(@Body() userDTO: CreateUserDTO) {
    const newUser = await this.commonService.createInstance<UserEntity>(
      EDBEntryNames.USERS,
      userDTO,
    );

    return newUser;
  }

  @ApiOkResponse({
    description: `Update user's password UpdatePasswordDto (with attributes)`,
    type: UserEntity,
    isArray: false,
  })
  @UsePipes(new ValidationPipe())
  @Put('/:id')
  public async updateUserPwd(
    @Body() pwdDataDTO: UpdateUserPasswordDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const updatePwd = (
      userInstance: UserEntity,
      dto: UpdateUserPasswordDTO,
    ): UserEntity => {
      userInstance.updatePwd(dto);
      return userInstance;
    };

    const user = await this.commonService.updateInstance<UserEntity>(
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
    return await this.commonService.deleteInstance<UserEntity>(
      EDBEntryNames.USERS,
      id,
    );
  }
}
