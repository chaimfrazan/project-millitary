import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Assignment extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare userId: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare shiftId: string;

}
