import { Sequelize } from "sequelize-typescript";
import dbConfig from "../config/db.config.js";
import { Job } from "./job.model.js";
import { Stakeholder } from "./stakeholder.model.js";
import { Userinfo } from "./userinfo.model.js";
import { RefreshToken } from "./refreshtoken.model.js";
import { Cart } from "./cart.model.js";
import { Product } from "./product.model.js";

const sequelize = new Sequelize({
  database: dbConfig.DB,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  dialect: 'mysql',
  models: [Userinfo, Job, Stakeholder, RefreshToken, Product, Cart],
});

export default sequelize;
