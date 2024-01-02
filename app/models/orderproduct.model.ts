import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey
} from 'sequelize-typescript';
import { Product } from './product.model';
import { Order } from './order.model';

@Table
export class OrderProduct extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @PrimaryKey
  @ForeignKey(() => Order)
  @Column
  private orderId!: number;

  @ForeignKey(() => Product)
  @Column
  private productId!: number;

  @Column
  private quantity!: number;

  @Column
  private unitPrice!: number;

  @Column
  private totalPrice!: number;

}