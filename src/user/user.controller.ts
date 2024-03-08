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
import { ICreateUserDTO, UpdatePasswordDto } from 'src/types';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    undefined;
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Post('')
  async createUser(@Body() userDTO: ICreateUserDTO) {
    return this.userService.createUser(userDTO);
  }

  @Put('/:id')
  async updateUserPwd(
    @Body() pwdDataDTO: UpdatePasswordDto,
    @Param('id') id: string,
  ) {
    return this.userService.updateUserPwd(id, pwdDataDTO);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
