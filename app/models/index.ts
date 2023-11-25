import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";
import { initializeJobModel } from "./job.model.js";
import { initializeStakeholderModel } from "./stakeholder.model.js";
import { initializeUserinfoModel } from "./userinfo.model.js";

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

const Job = initializeJobModel(sequelize);
const Stakeholder = initializeStakeholderModel(sequelize);
const Userinfo = initializeUserinfoModel(sequelize);

const db = {
  sequelize,
  Sequelize,
  jobs: Job,
  stakeholder: Stakeholder,
  userinfo: Userinfo,
};

export default db;
