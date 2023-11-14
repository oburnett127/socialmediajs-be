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
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    pictureUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'stakeholder',
  });

  return Stakeholder;
}
