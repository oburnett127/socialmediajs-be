import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config";

import JobInitializer from "./job.model";
// If `Stakeholder` is a named export, not default:
import { Stakeholder as StakeholderInitializer } from "./stakeholder.model";

import UserInfoInitializer from "./userinfo.model";

const sequelize = new Sequelize(/*...dbConfig...*/);

// Here, Job is the initialized model, not the initializer function.
const Job = new JobInitializer(sequelize);
const Stakeholder = new StakeholderInitializer(sequelize);
const UserInfo = new UserInfoInitializer(sequelize);

const db = {
  sequelize,
  Sequelize,
  jobs: Job, // This should be the initialized model
  stakeholder: Stakeholder,
  userinfo: UserInfo,
};

export default db;
