import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

// These are all the attributes in the Job model
interface JobAttributes {
  id: number;
  title: string;
  desc: string;
  requirements: string;
  postDate: Date;
}

// Some attributes are optional in `create` and `build` operations
interface JobCreationAttributes extends Optional<JobAttributes, 'id'> {}

// We need to declare an interface for our model that is basically what our class would be
interface JobInstance
  extends Model<JobAttributes, JobCreationAttributes>,
    JobAttributes {}

export default (sequelize: Sequelize): ModelStatic<JobInstance> => {
  const Job = sequelize.define<JobInstance>(
    "job",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Job title"
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Job description"
      },
      requirements: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Job requirements"
      },
      postDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
    },
    {
      tableName: 'jobs' // Optional: define the table's name
    }
  );

  return Job;
};
