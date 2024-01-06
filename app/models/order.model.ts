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

  @HasMany(() => OrderProduct)
  private products!: OrderProduct[];

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  private totalPrice!: number;

  
  private shippingAddress!: Address;

  private billingInfo!: BillingInfo;

  private orderStatus!: string;

}

class BillingInfo {

  private cardholderName!: string;

  private expirationDate!: Date;

}
