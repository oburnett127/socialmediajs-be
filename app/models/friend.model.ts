import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';

enum FriendStatus {
  FRIEND = "friend",
  PENDING = "pending",
}

@Table
export class Friend extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private declare friendId: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private fromUserId!: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private toUserId!: number;
 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })  
  private orderStatus!: string;

}
