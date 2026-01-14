import { User } from './entities/users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import * as bcrypt from 'bcrypt';

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

  async create(user: CreateUserDto): Promise<User | null> {
    const newUser = await this.userModel.create({ ...user });
    return newUser;
  }

  async getAll(): Promise<{ message: string; data: User[] }> {
    const allUsers = await this.userModel.findAll();
    return {
      message: 'the commander login sucsses',
      data: allUsers,
    };
  }

  async removeById(id: string): Promise<{ message: string }> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new UnauthorizedException('usern not found');
    }
    await user.destroy();
    return {
      message: 'the user removed sucsses',
    };
  }

  async getByid(id: string): Promise<{ message: string; data: any }> {
    const user = await this.findOne({ id });

    if (!user) {
      throw new UnauthorizedException('username not found');
    }
    return {
      message: 'data of the user: ',
      data: user,
    };
  }
  async upByid(
    user: UpdateUserDto,
    id: string,
  ): Promise<{ message: string; data: any }> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await this.userModel.update(user, { where: { id } });
    return {
      message: 'the user updated sucsses ',
      data: user,
    };
  }
}
