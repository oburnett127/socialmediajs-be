import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table
export class Stakeholder extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  pictureUrl?: string;

}
