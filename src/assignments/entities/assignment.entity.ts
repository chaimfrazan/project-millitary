import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Shift } from 'src/shifts/entities/shift.entity';
import { User } from 'src/users/entities/users.entity';

@Table
export class Assignment extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(() => Shift)
  @Column({
    type: DataType.NUMBER,
    allowNull: false,
  })
  declare shiftId: number;

  @BelongsTo(() => User)
  users: User;

  @BelongsTo(() => Shift)
  shifts: Shift;
}
