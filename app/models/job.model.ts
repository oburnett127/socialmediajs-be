import { Model, DataTypes, Sequelize } from 'sequelize';

export class Job extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public requirements?: string;
  public postDate!: Date;
}

export function initializeJobModel(sequelize: Sequelize): typeof Job {
  Job.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    postDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Job',
    timestamps: true,
  });

  return Job;
}
