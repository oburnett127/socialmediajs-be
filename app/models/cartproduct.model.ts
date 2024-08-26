import { Model, Table, Column, DataType, PrimaryKey, ForeignKey, AllowNull } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { Cart } from './friend.model.js';
import { Category } from './category.model.js';
import { AutoSetter } from '../util/decorators.js';

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
  private cartId!: number;

  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  @AutoSetter
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
  private categoryId!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private totalPrice!: number;

  quantityIncrement(delta: number) {
    if (typeof this.quantity === 'number') {
      this.quantity += delta;
    } else {
      console.error('Property is not a number.');
    }
  }

}
