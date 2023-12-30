import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Job extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  title!: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.TEXT)
  requirements?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  postDate!: Date;

}
