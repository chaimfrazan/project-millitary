import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Role } from 'src/auth/role.enum';

@Table
export class User extends Model {
  @Column({
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    allowNull: false,
  })
  declare email: string;

  @Column({
    allowNull: false,
  })
  declare password: string;

  @Column({
    allowNull: false,
  })
  declare role: Role;
}
