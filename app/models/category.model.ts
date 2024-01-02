import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

@Table
export class Category extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @Column
  private name!: string;

  @Column
  private description!: string;

}