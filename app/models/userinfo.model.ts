import { DataTypes, Model, Sequelize } from 'sequelize';

// interface UserInfoAttributes {
//   id: number;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   isAdmin: boolean;
// }

// interface UserInfoCreationAttributes {
//   id?: number;
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   isAdmin?: boolean;
// }

export class UserInfo extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public isAdmin!: boolean;
}

export function initializeUserInfoModel(sequelize: Sequelize): typeof UserInfo {
  UserInfo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'UserInfo',
  });

  return UserInfo;
}
