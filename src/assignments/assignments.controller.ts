import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  getAll() {
    return this.assignmentsService.getAll();
  }

  @Get(':id')
  getByid(@Param('id') id: string) {
    return this.assignmentsService.getByid(+id);
  }

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    return this.assignmentsService.upByid(updateAssignmentDto, +id);
  }

  @Roles(Role.commander)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.assignmentsService.removeById(+id);
  }
}
