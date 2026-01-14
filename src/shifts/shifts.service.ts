import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Shift } from './entities/shift.entity';

@Injectable()
export class ShiftsService {
    constructor(
      @InjectModel(Shift)
      private readonly assModel: typeof Shift,
  ) { }
  
  findOne(params: Record<string, any>): Promise<Shift | null> {
    return this.assModel.findOne({
      where: params,
    });
  }

  async create(user: CreateShiftDto): Promise<Shift | null> {
    const newAssignment = await this.assModel.create({ ...user });
    return newAssignment;
  }

  async getAll(): Promise<{ message: string; data: Shift[] }> {
    const allAssignments = await this.assModel.findAll();
    return {
      message: 'data of all assignmets: ',
      data: allAssignments,
    };
  }

  async removeById(id: number): Promise<{ message: string }> {
    const assignment = await this.findOne({ id });
    if (!assignment) {
      throw new UnauthorizedException('assignment not found');
    }
    await assignment.destroy();
    return {
      message: 'the assignment removed sucsses',
    };
  }

  async getByid(id: number): Promise<{ message: string; data: any }> {
    const assignment = await this.findOne({ id });

    if (!assignment) {
      throw new UnauthorizedException('assignment not found');
    }
    return {
      message: 'data of the assignment: ',
      data: assignment,
    };
  }
  async upByid(
    assignment: UpdateShiftDto,
    id: number,
  ): Promise<{ message: string; data: any }> {
    await this.assModel.update(assignment, { where: { id } });
    return {
      message: 'the user updated sucsses ',
      data: assignment,
    };
  }
}
