import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model';

@Table
export class Order extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  private declare orderId: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  private userId!: number;

  @Column({ allowNull: false })
  @HasMany(() => OrderProduct)
  private products!: OrderProduct[];

  private totalPrice!: number;

  @Column({ allowNull: true })
  private shippingAddress!: Address;

  @Column({ allowNull: true })
  private billingInfo!: BillingInfo;

  @Column({ allowNull: false })
  private orderStatus!: string;

}

class OrderProduct {
  
  private id!: string;

  private productName!: string;

  private quantity!: number;

  private unitPrice!: number;

  private totalPrice!: number;

  private additionalInfo!: string;

  private createdAt!: Date;

}

class BillingInfo {

  private cardholderName!: string;

  private expirationDate!: string;

}

class Address {

  private street!: string;

  private city!: string;

  private state!: string;

  private postalCode!: string;

  private country!: string;

}
