// job.model.ts
import { Model, DataTypes, Sequelize } from 'sequelize';

// First, we define the model class by extending Sequelize's Model class
export class Job extends Model {
  // Define attributes here
  public id!: number;
  public title!: string;
  public description?: string;
  public requirements?: string;
  public postDate!: Date;
  // You can also define other instance level methods here
}

// Then, we export a function that accepts a Sequelize instance and uses it to initialize our model.
export function initializeJobModel(sequelize: Sequelize): typeof Job {
  Job.init({
    // Model attributes are defined here
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    requirements: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    // ...more attributes...
  }, {
    sequelize,
    modelName: 'Job',
    // ...other model options...
  });

  return Job;
}
