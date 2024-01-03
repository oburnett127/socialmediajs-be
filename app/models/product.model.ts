import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, BelongsToMany } from 'sequelize-typescript';
import { Category } from './category.model.js';
import { CartProduct } from './cartProduct.model.js';
import { Cart } from './cart.model.js';

@Table
export class Product extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  private name!: string;

  @BelongsToMany(() => Cart, () => CartProduct)
  carts?: Cart[];

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

  @Column({ type: DataType.INTEGER.UNSIGNED })
  private stockQuantity!: number;

  private manufacturer!: string;

}