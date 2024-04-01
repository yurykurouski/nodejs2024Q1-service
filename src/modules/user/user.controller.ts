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
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserPasswordDTO } from './dto/update-user-password.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDataInterceptor } from './user.interceptor';

@Controller('user')
@UseInterceptors(UserDataInterceptor)
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {
    undefined;
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all users',
    type: UserEntity,
    isArray: true,
  })
  public async getUsers() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Get single user by id',
    type: UserEntity,
    isArray: false,
  })
  public async getUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Post('')
  @UsePipes(new ValidationPipe())
  @ApiOkResponse({
    description: 'Create user (following DTO should be used) CreateUserDto',
    type: UserEntity,
    isArray: false,
  })
  public async createUser(@Body() userDTO: CreateUserDTO) {
    return await this.userService.create(userDTO);
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
    return await this.userService.updateUserPwd(id, pwdDataDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({
    description: 'Delete user',
    type: null,
    isArray: false,
  })
  public async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.remove(id);
  }
}
