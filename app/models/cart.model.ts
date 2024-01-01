import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, HasMany, ForeignKey } from 'sequelize-typescript';
import { Product } from './product.model.js';
import { Userinfo } from './userinfo.model.js';

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

  @Column({ allowNull: false })
  @HasMany(() => Product)
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

  @Column({ allowNull: true })
  private shippingInfo!: ShippingInfo;

  @Column({ allowNull: true })
  private taxInfo!: TaxInfo;

  @Column({ allowNull: false })
  private cartStatus!: CartStatus;

  //private sessionId: number;

}
