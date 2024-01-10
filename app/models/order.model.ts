import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';
import { OrderProduct } from './orderProduct.model.js';
import { Address } from './address.model.js';

@Table
export class Order extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private declare orderId: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private userId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  private orderDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  private totalPrice!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  private shippingAddress!: Address;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  private billingInfo!: BillingInfo;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })  
  private orderStatus!: string;

  @HasMany(() => OrderProduct)
  private products!: OrderProduct[];

  
}

class BillingInfo {

  private cardholderName!: string;

  private expirationDate!: Date;

}

enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
  REFUNDED = "refunded",
  ONHOLD = "on hold",
  COMPLETED = "completed",
  FAILED = "failed",
  PENDINGPAYMENT = "pending payment",
}
