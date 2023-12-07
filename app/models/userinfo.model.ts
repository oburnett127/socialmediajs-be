import {
  Model,
  Table,
  Column,
  DataType
} from 'sequelize-typescript';

@Table
export class Userinfo extends Model<Userinfo> {

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  password!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  lastName!: string;

}
