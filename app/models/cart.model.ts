// import {
//   Model,
//   Table,
//   Column,
//   DataType,
//   PrimaryKey,
//   AutoIncrement
// } from 'sequelize-typescript';

// @Table
// export class Cart extends Model {

//   @PrimaryKey
//   @AutoIncrement
//   @Column(DataType.INTEGER.UNSIGNED)
//   declare cartId: number;

//   @Column({
//     type: DataType.STRING(50),
//     allowNull: false
//   })
//   userId!: string;

//   @Column({
//     type: DataType.STRING(50),
//     allowNull: true
//   })
//   cartProducts!: string;

//   @Column({
//     type: DataType.DECIMAL(10, 2),
//     allowNull: false
//   })
//   subtotal!: number;

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//   total!: number;

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//   shippingAddress!: number;
// }
