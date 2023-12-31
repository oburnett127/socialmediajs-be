import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

@Table
export class Cart extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  private declare cartId: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  private userId!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  private cartProducts!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  private subtotal!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  private total!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  private shippingAddress!: number;

private shippingMethod:

private taxRate:

private taxAmount:

private createdAt:

private updatedAt:

private cartStatus:

    sessionId:




}
