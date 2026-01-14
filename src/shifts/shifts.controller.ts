import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() CreateShiftDto: CreateShiftDto) {
    return this.shiftsService.create(CreateShiftDto);
  }

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.shiftsService.getAll();
  }

  @Get(':id')
  getByid(@Param('id') id: string) {
    return this.shiftsService.getByid(+id);
  }

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() UpdateShiftDto: UpdateShiftDto,
  ) {
    return this.shiftsService.upByid(UpdateShiftDto, +id);
  }

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.shiftsService.removeById(+id);
  }
}
