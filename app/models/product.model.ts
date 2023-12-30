// import {
//   Model,
//   Table,
//   Column,
//   DataType,
//   PrimaryKey,
//   AutoIncrement
// } from 'sequelize-typescript';

// @Table
// export class Product extends Model {

//   @PrimaryKey
//   @AutoIncrement
//   @Column(DataType.INTEGER.UNSIGNED)
//   declare id: number;

//   @Column({
//     type: DataType.STRING(50),
//     allowNull: false
//   })
//   name!: string;

//   @Column({
//     type: DataType.STRING(50),
//     allowNull: true
//   })
//   description!: string;

//   @Column({
//     type: DataType.DECIMAL(10, 2),
//     allowNull: false
//   })
//   unitPrice!: number;

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//   unitsInStock!: number;
// }
