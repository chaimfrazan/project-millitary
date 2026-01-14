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
import { AssignmentsService } from './assignments.service';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: AssignmentsService) {}
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
}