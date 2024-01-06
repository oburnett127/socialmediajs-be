import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

@Table
export class Category extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED })
  declare id: number;

  @Column({ 
    type: DataType.STRING,
    allowNull: false,
   })
  private name!: string;

  @Column({ 
    type: DataType.STRING,
    allowNull: true,
   })
  private description!: string;

}