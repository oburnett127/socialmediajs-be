import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

@Table
export class Payment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  declare paymentId: number;

  @Column
  private orderId!: number;

  @Column
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

  billingAddress

  paymentDetails

  currency

  notes

  paymentSource

  paymentType


}