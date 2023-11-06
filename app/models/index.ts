import dbConfig from "../config/db.config"; // assuming export default is used in db.config.ts

import { Sequelize } from "sequelize";

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

// If you're using TypeScript, it's best practice to define interfaces for your models.
// For instance:
//
// import { JobModel } from "./job.model";
// import { StakeholderModel } from "./stakeholder.model";
// import { UserInfoModel } from "./userinfo.model";

// Initialize models
// Here you would import your models using the TypeScript import syntax.
// You would also ensure that the corresponding model files export classes or functions appropriately.
// This might look something like this:

import Job from "./job.model";
import Stakeholder from "./stakeholder.model";
import UserInfo from "./userinfo.model";

interface Db {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  jobs: typeof Job;
  stakeholder: typeof Stakeholder;
  userinfo: typeof UserInfo;
}

export const db: Db = {
  Sequelize,
  sequelize,
  jobs: Job(sequelize, Sequelize), // Assuming Job is initialized this way
  stakeholder: Stakeholder(sequelize, Sequelize), // Assuming Stakeholder is initialized this way
  userinfo: UserInfo(sequelize, Sequelize), // Assuming UserInfo is initialized this way
};

module.exports = db;