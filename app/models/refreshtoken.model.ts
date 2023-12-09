import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, DataType, AutoIncrement } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model';

@Table
export class RefreshToken extends Model<RefreshToken> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    declare id: number;
   
    @Column
    token!: string;

    @ForeignKey(() => Userinfo)
    @Column(DataType.INTEGER.UNSIGNED)
    userId!: number;

    @BelongsTo(() => Userinfo, 'userId')
    userinfo!: Userinfo;

    @Column
    expiryDate!: Date;
}
