import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, BelongsToMany, ForeignKey } from 'sequelize-typescript';
import { Category } from './category.model.js';
import { CartProduct } from './cartProduct.model.js';
import { Cart } from './cart.model.js';

@Table
export class Product extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,})
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  private name!: string;

  @BelongsToMany(() => Cart, () => CartProduct)
  carts?: Cart[];

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  private description!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  private unitPrice!: number;

  @Column({ 
    type: DataType.STRING,
    allowNull: true, 
  })
  private imageUrl?: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false, 
  })
  categoryId!: number;

  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false, })
  private stockQuantity!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private manufacturer!: string;

}