import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateUserDto } from './dto/update-users.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getByid(@Param('id') id: string) {
    return this.userService.getByid(id);
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.userService.removeById(id);
  }

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  upByid(
    @Body() signUpDto: UpdateUserDto,
    @Param('id') id: string) {
    return this.userService.upByid(signUpDto,id);
  }
}

