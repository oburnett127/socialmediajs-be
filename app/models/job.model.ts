import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Job extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  private title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  private description?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  private requirements?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    allowNull: false,
  })
  private postDate!: Date;

}
