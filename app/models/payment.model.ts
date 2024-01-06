import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType, ForeignKey } from 'sequelize-typescript';
import { Address } from './address.model.js';
import { Userinfo } from './userinfo.model.js';
import { Order } from './order.model.js';

@Table
export class Payment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false, })
  declare paymentId: number;

  @ForeignKey(() => Order)
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false, })
  private orderId!: number;

  @ForeignKey(() => Userinfo)
  @Column({ 
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false, })
  private userId!: number;

  private paymentDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  private amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private paymentMethod!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  private transactionId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private status!: PaymentStatus;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private paymentGateway!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  private billingAddress!: Address;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  private paymentDetails!: Record<string, any>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private currency!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  private notes!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private paymentSource!: PaymentSource;

}

enum PaymentStatus {
  Pending = 'Pending',
  Authorized = 'Authorized',
  Captured = 'Captured',
  Declined = 'Declined',
  Failed = 'Failed',
  Refunded = 'Refunded',
  Voided = 'Voided',
  Settled = 'Settled',
  PendingReview = 'Pending Review',
  Chargeback = 'Chargeback',
  AuthorizedForPartialCapture = 'Authorized for Partial Capture',
  Canceled = 'Canceled',
  Expired = 'Expired',
}

enum PaymentSource {
  CreditCard = 'Credit Card',
  DebitCard = 'Debit Card',
}
