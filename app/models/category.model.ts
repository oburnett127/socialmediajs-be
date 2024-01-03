import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Category extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED })
  declare id: number;

  private name!: string;

  private description!: string;

}