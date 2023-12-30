import { Model, Table, Column, PrimaryKey, ForeignKey, DataType, AutoIncrement, AllowNull, BelongsTo } from 'sequelize-typescript';
import { Userinfo } from './userinfo.model.js';

@Table({
    modelName: 'refreshtoken',
})
export class RefreshToken extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER.UNSIGNED)
    declare id: number;
   
    @AllowNull(false)
    @Column(DataType.STRING)
    token!: string;

    @AllowNull(false)
    @ForeignKey(() => Userinfo)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        references: {
         model: Userinfo,
         key: 'id'
        }
    })
    userId!: number;

    @AllowNull(false)
    @Column(DataType.DATE)
    expiryDate!: Date;
}
