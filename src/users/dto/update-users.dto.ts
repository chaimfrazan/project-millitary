import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-users.dto';
import { Role } from 'src/auth/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    username: string | undefined;
    password: string | undefined;
    email: string | undefined;
    role: Role.soldier;
}