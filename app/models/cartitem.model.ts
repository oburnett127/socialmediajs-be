import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';
import { Product } from './product.model';

@Table
export class CartItem extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare private productId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  private quantity!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
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
  private imageUrl!: string;

  private category!: string;

  private totalPrice!: number;

  private product!: Product;

}
