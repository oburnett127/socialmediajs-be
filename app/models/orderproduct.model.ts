import { Model, Table, Column, PrimaryKey, AutoIncrement, ForeignKey, DataType } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { Order } from './order.model.js';

@Table
export class OrderProduct extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED })
  declare id: number;

  @PrimaryKey
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  private orderId!: number;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  private productId!: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  private quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private unitPrice!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private totalPrice!: number;

}