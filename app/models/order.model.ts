import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model';
import { OrderProduct } from './orderproduct.model';

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

  @Column
  private totalPrice!: number;

  @Column({ allowNull: true })
  private shippingAddress!: Address;

  @Column({ allowNull: true })
  private billingInfo!: BillingInfo;

  @Column({ allowNull: false })
  private orderStatus!: string;

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
