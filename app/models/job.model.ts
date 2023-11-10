import { Model, DataTypes, Sequelize } from 'sequelize';

interface JobAttributes {
  id: number;
  title: string;
  description: string;
  requirements: string;
  postDate: Date;
}

interface JobCreationAttributes {
  title: string;
  description: string;
  requirements: string;
  postDate: Date;
}

class JobModel extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public requirements!: string;
  public postDate!: Date;
}

export function initJobModel(sequelize: Sequelize): typeof JobModel {
  JobModel.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'jobs',
    sequelize,
  });

  return JobModel;
}

export default JobModel;
