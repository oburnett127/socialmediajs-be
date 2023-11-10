import {
  Model,
  DataTypes,
  Optional,
  Sequelize
} from 'sequelize';

class Stakeholder extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
}

function initStakeholder(sequelize: Sequelize): void {
  Stakeholder.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'stakeholder',
  });
}

initStakeholder(new Sequelize('sqlite::memory:'));

type StakeholderAttributes = {
  id: number;
  firstName: string;
  lastName: string;
};

type StakeholderCreationAttributes = Optional<StakeholderAttributes, 'id'>;

export { Stakeholder, StakeholderAttributes, StakeholderCreationAttributes };
