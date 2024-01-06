import { Model, Table, Column, DataType, PrimaryKey, ForeignKey, AllowNull } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { Cart } from './cart.model.js';
import { Category } from './category.model.js';

@Table
export class CartProduct extends Model {

  @PrimaryKey
  @ForeignKey(() => Product)
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare productId: number;

  @PrimaryKey
  @ForeignKey(() => Cart)
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  cartId!: number;

  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private quantity!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  private name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  private description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  private imageUrl!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  categoryId!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private totalPrice!: number;

}
