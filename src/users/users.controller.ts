import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { UsersService } from './users.service';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.userService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
