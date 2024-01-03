import { Model, Table, Column, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { Cart } from './cart.model.js';
import { Category } from './category.model.js';

@Table
export class CartProduct extends Model {

  @PrimaryKey
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  declare productId: number;

  @PrimaryKey
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  cartId!: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
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

  private imageUrl!: string;

  private category!: Category;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private totalPrice!: number;

  //private product!: Product;

}
