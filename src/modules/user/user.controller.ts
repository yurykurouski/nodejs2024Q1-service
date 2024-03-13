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
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EDBEntryName } from 'src/types';
import { SharedService } from 'src/modules/shared/shared-service/shared.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { USerService } from './user.service';
import { UserDataInterceptor } from './user.interceptor';

@Controller('user')
@UseInterceptors(UserDataInterceptor)
@ApiTags('User')
export class UserController {
  constructor(
    private sharedService: SharedService,
    private userService: USerService,
  ) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all users',
    type: UserEntity,
    isArray: true,
  })
  public async getUsers() {
    return this.sharedService.getInstances(EDBEntryName.USER);
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single user by id',
    type: UserEntity,
    isArray: false,
  })
  public async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.sharedService.getInstanceById(EDBEntryName.USER, id);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create user (following DTO should be used) CreateUserDto',
    type: UserEntity,
    isArray: false,
  })
  public async createUser(@Body() userDTO: CreateUserDTO) {
    return this.sharedService.createInstance<UserEntity>(
      EDBEntryName.USER,
      userDTO,
    );
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: `Update user's password UpdatePasswordDto (with attributes)`,
    type: UserEntity,
    isArray: false,
  })
  public async updateUserPwd(
    @Body() pwdDataDTO: UpdateUserPasswordDTO,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.userService.updateUserPwd(id, pwdDataDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete user',
    type: null,
    isArray: false,
  })
  public async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.sharedService.deleteInstanceWithRef<UserEntity>(
      EDBEntryName.USER,
      id,
    );
  }
}
