import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config"; // assuming export default is used in db.config.ts

import Job from "./job.model"; // Assuming these are the models defined with Sequelize.define
import Stakeholder from "./stakeholder.model";
import UserInfo from "./userinfo.model";

// It's a good practice to define attributes as interfaces for strong typing
interface JobAttributes {
  // Define job model attributes here
}

interface StakeholderAttributes {
  // Define stakeholder model attributes here
}

interface UserInfoAttributes {
  // Define user info model attributes here
}

// Sequelize instance initialization with typing for known properties
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
});

// Define model static types as interfaces which extend Model for each respective attribute set
interface JobInstance extends Model<JobAttributes>, JobAttributes {}
interface StakeholderInstance extends Model<StakeholderAttributes>, StakeholderAttributes {}
interface UserInfoInstance extends Model<UserInfoAttributes>, UserInfoAttributes {}

// Static model types
interface JobModel extends ModelStatic<JobInstance> {}
interface StakeholderModel extends ModelStatic<StakeholderInstance> {}
interface UserInfoModel extends ModelStatic<UserInfoInstance> {}

// Database Interface
interface Db {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  jobs: JobModel;
  stakeholder: StakeholderModel;
  userinfo: UserInfoModel;
}

// db object
const db: Db = {
  Sequelize,
  sequelize,
  jobs: Job(sequelize), // Assuming Job function properly initializes the model
  stakeholder: Stakeholder(sequelize), // Assuming Stakeholder function does the same
  userinfo: UserInfo(sequelize), // Assuming UserInfo function as well
};

export default db;
