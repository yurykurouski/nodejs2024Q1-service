import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { Public } from './decorators/public.decorator';
import { UserDataInterceptor } from '../user/user.interceptor';
import { UpdateRefreshDTO } from './dto/update-refresh.dto';

@Controller('auth')
@UseInterceptors(UserDataInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  public async signup(@Body() userDTO: CreateUserDTO) {
    return await this.authService.createUser(userDTO);
  }

  @Public()
  @Post('/login')
  @UsePipes(new ValidationPipe())
  public async login(@Body() userDTO: CreateUserDTO) {
    return await this.authService.loginUser(userDTO);
  }

  @Post('/refresh')
  @UsePipes(new ValidationPipe())
  public async updateRefresh(@Body() updateRefreshDTO: UpdateRefreshDTO) {
    return await this.authService.updateRefresh(updateRefreshDTO);
  }
}
