import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType, ForeignKey } from 'sequelize-typescript';
import { Address } from './address.model.js';
import { Userinfo } from './userinfo.model.js';
import { Order } from './order.model.js';

@Table
export class Payment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED })
  declare paymentId: number;

  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  private orderId!: number;

  @ForeignKey(() => Userinfo)
  @Column({ type: DataType.INTEGER.UNSIGNED })
  private userId!: number;

  private paymentDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private amount!: number;

  private paymentMethod!: string;

  private transactionId!: string;

  private status!: PaymentStatus;

  private paymentGateway!: string;

  private billingAddress!: Address;

  private paymentDetails!: Record<string, any>;

  private currency!: string;

  private notes!: string;

  private paymentSource!: PaymentSource;

}

enum PaymentStatus {
  Pending = 'Pending',
  Authorized = 'Authorized',
  Captured = 'Captured',
  Failed = 'Failed',
  Refunded = 'Refunded',
  Canceled = 'Canceled'
}

enum PaymentSource {
  CreditCard = 'Credit Card',
  DebitCard = 'Debit Card',
}
