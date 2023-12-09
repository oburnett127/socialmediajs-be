import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';

@Table
export class Stakeholder extends Model<Stakeholder> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

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

  @Column(DataType.TEXT)
  pictureUrl?: string;

}
