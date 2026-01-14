import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment)
    private readonly assModel: typeof Assignment,
  ) {}

  findOne(params: Record<string, any>): Promise<Assignment | null> {
    return this.assModel.findOne({
      where: params,
    });
  }

  async create(user: CreateAssignmentDto): Promise<Assignment | null> {
    const newAssignment = await this.assModel.create({ ...user });
    return newAssignment;
  }

  async getAll(): Promise<{ message: string; data: Assignment[] }> {
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
    assignment: UpdateAssignmentDto,
    id: number,
  ): Promise<{ message: string; data: any }> {
    await this.assModel.update(assignment, { where: { id } });
    return {
      message: 'the user updated sucsses ',
      data: assignment,
    };
  }
}
