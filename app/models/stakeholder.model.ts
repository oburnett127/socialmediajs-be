import {
  Model,
  DataTypes,
  Sequelize
} from 'sequelize';

export class Stakeholder extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
}

export function initializeStakeholderModel(sequelize: Sequelize): typeof Stakeholder {
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

  return Stakeholder;
}

// //Change it from sqllite to mysql
// initializeStakeholderModel(new Sequelize('sqlite::memory:'));

// type StakeholderAttributes = {
//   id: number;
//   firstName: string;
//   lastName: string;
// };

// type StakeholderCreationAttributes = Optional<StakeholderAttributes, 'id'>;

// export { Stakeholder, StakeholderAttributes, StakeholderCreationAttributes };
