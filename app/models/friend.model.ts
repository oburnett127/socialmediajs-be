import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';

export enum FriendStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
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
    type: DataType.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
    allowNull: false,
  })  
  private status!: string;

}
