import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

// Assuming these are the correct imports for your initializers based on your project structure
import { initializeJobModel } from "./job.model.js";
import { initializeStakeholderModel } from "./stakeholder.model.js";
import { initializeUserInfoModel } from "./userinfo.model.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Initialize your models here, no "new" keyword should be used
const Job = initializeJobModel(sequelize);
const Stakeholder = initializeStakeholderModel(sequelize);
const UserInfo = initializeUserInfoModel(sequelize);

const db = {
  sequelize,
  Sequelize,
  jobs: Job, // These are now the initialized Sequelize models
  stakeholder: Stakeholder,
  userinfo: UserInfo,
};

export default db;
