import { Role } from "src/auth/role.enum";

export class CreateUserDto {
    username: string;
    email: string
    password: string;
    role: Role
    
}