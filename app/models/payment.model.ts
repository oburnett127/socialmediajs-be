import { Model, Table, Column, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Address } from './address.model.js';

@Table
export class Payment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({ type: DataType.INTEGER.UNSIGNED })
  declare paymentId: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  private orderId!: number;

  @Column({ type: DataType.INTEGER.UNSIGNED })
  private userId!: number;

  @Column
  private paymentDate!: Date;

  @Column
  private amount!: number;

  @Column
  private paymentMethod!: string;

  @Column
  private transactionId!: string;

  @Column
  private status!: number;

  @Column
  private paymentGateway!: string;

  @Column
  private billingAddress!: Address;

  @Column
  private paymentDetails!: Record<string, any>;

  @Column
  private currency!: string;

  @Column
  private notes!: string;

  @Column
  private paymentSource!: PaymentSource;

}

enum PaymentSource {
  CreditCard = 'Credit Card',
  DebitCard = 'Debit Card',
}