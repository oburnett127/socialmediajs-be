import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';

@Table
export class Post extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private declare postId: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private authorUserId!: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private profileUserId!: number;
 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })  
  private text!: string;

}
