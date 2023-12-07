import { Model, Table, Column, PrimaryKey, ForeignKey, BelongsTo, AutoIncrement } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';

@Table
export class RefreshToken extends Model<RefreshToken> {
    @Column
    token!: string;

    @ForeignKey(() => Userinfo)
    @Column
    userId!: number;

    @BelongsTo(() => Userinfo)
    userInfo!: Userinfo;

    @Column
    expiryDate!: Date;
}
