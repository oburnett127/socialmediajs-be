import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, DataType, AutoIncrement } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';

@Table
export class RefreshToken extends Model<RefreshToken> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    declare id: number;
   
    // Explicitly specify the data type for the token
    @Column(DataType.STRING)
    token!: string;

    @ForeignKey(() => Userinfo)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        references: {
         model: Userinfo,
         key: 'id'
        }
    })
    userId!: number;

    @BelongsTo(() => Userinfo, 'userId')
    userinfo!: Userinfo;

    // Explicitly specify the data type for the expiryDate
    @Column(DataType.DATE)
    expiryDate!: Date;
}
