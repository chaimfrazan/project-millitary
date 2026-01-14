import { User } from './entities/users.entity';
import { InjectModel } from '@nestjs/sequelize';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  findOne(params: Record<string, any>): Promise<User | null> {
    return this.userModel.findOne({
      where: params,
    });
  }
  create(user: any) {
    return this.userModel.create(user);
  }

  async getAll(): Promise<{ message: string; data: User[] }> {
    const allUsers = await this.userModel.findAll();
    return {
      message: 'the commander login sucsses',
      data: allUsers,
    };
  }

  async remove(id: string): Promise<{ message: string }> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new UnauthorizedException('username not found');
    }
    await user.destroy();
    return {
      message: 'the user removed sucsses',
    };
  }
}
