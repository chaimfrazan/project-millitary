import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    email: string,
    pass: string,
  ): Promise<{ access_token: string; message: string }> {
    const User = await this.usersService.findOne({ username });
    if (User) {
      throw new BadRequestException('user already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
      role: Role.soldier,
    });

    const payload = {
      username: user.username,
      role: user.role,
    };

    return {
      message: 'the user create sucsses',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string; message: string }> {
    const user = await this.usersService.findOne({ username });
    if (!user || !pass) {
      throw new UnauthorizedException('username or password are incorrect');
    }
    const comPass = await bcrypt.compare(pass, user.password);
    if (!comPass) {
      throw new UnauthorizedException('the password are incorrect');
    }
    const payload = {
      username: user.username,
      role: user.role,
    };
    return {
      message: 'the soldier login sucsses',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
