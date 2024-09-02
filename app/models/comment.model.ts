import { Model, Table, Column, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';
import { Post } from './post.model.js';

@Table
export class Comment extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private declare commentId: number;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private postId!: number;

  @ForeignKey(() => Userinfo)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  private userId!: number;
 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })  
  private text!: string;

}
