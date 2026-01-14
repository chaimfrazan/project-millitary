import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import { Role } from './role.enum';
import { CreateUserDto } from 'src/users/dto/create-users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto ) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.commander)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
