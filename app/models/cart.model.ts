import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { Userinfo } from './userinfo.model.js';
import { CartProduct } from './cartProduct.model.js';

enum CartStatus {
  OPEN = "open",
  CLOSED = "closed",
}

interface ShippingInfo {
  address: string;
  shippingMethod: string;
}

interface TaxInfo {
  rate: number;
  amount: number;
}

@Table
export class Cart extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private declare cartId: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private userId!: number;

  @BelongsToMany(() => Product, () => CartProduct)
  private cartProducts!: Product[];

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  private subtotal!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  private total!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  private shippingInfo?: ShippingInfo;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  private taxInfo?: TaxInfo;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  private cartStatus!: CartStatus;

  //private sessionId: number;

}
