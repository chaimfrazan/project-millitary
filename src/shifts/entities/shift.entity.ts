import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Shift extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare startTime: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare endTime: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare location: string;
}
