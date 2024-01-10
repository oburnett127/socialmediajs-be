import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Order } from './order.model.js';

@Table
export class Userinfo extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
  })
  lastName!: string;

  @HasMany(() => Order)
  orders!: Order[];
}
