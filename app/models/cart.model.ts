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
  @Column(DataType.INTEGER.UNSIGNED)
  private declare cartId: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false
  })
  private userId!: number;

  @BelongsToMany(() => Product, () => CartProduct)
  private cartProducts!: Product[];

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

  private shippingInfo!: ShippingInfo;

  private taxInfo!: TaxInfo;

  private cartStatus!: CartStatus;

  //private sessionId: number;

}
