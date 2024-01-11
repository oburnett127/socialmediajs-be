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
  private firstName!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  private lastName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  private pictureUrl?: string;

}
