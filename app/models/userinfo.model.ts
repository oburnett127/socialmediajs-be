import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

@Table
export class Userinfo extends Model<Userinfo> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

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
