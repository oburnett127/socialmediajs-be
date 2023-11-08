import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

// Define attributes for the Stakeholder model
interface StakeholderAttributes {
  id: number;
  firstName: string;
  lastName: string;
}

// Some attributes are optional when creating instances
interface StakeholderCreationAttributes extends Optional<StakeholderAttributes, 'id'> {}

// Extend the model instance with attributes and creation attributes
interface StakeholderInstance
  extends Model<StakeholderAttributes, StakeholderCreationAttributes>,
    StakeholderAttributes {}

// Define a function that will initialize the model
const defineStakeholder = (sequelize: Sequelize): ModelStatic<StakeholderInstance> => {
  const Stakeholder = sequelize.define<StakeholderInstance>(
    "stakeholder",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'stakeholders' // Optional: Define the table's name if different from the default
    }
  );

  return Stakeholder;
};

export default defineStakeholder;
