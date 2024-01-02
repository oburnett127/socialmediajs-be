import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

@Table
export class Product extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare private productId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  private name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  private description!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private unitPrice!: number;

  private imageUrl!: string;

  private category!: Category;

  private stockQuantity!: number;

  private manufacturer!: string;

}