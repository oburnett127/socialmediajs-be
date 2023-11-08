import { BuildOptions, DataTypes, Model, Sequelize as SequelizeTypes } from 'sequelize';

interface UserInfoAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

interface UserInfoCreationAttributes extends Optional<UserInfoAttributes, 'id'> {}

interface UserInfoInstance extends Model<UserInfoAttributes, UserInfoCreationAttributes>, UserInfoAttributes {}

export default (sequelize: SequelizeTypes, DataTypes: typeof SequelizeTypes.DataTypes): ModelStatic<UserInfoInstance> => {
  const UserInfo = sequelize.define<UserInfoInstance>('userInfo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }  
  });

  return UserInfo;
};
