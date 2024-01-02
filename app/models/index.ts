import { Sequelize } from "sequelize-typescript";
import dbConfig from "../config/db.config.js";
import { Job } from "./job.model.js";
import { Stakeholder } from "./stakeholder.model.js";
import { Userinfo } from "./userinfo.model.js";
import { RefreshToken } from "./refreshtoken.model.js";
import { Cart } from "./cart.model.js";
import { Product } from "./product.model.js";
import { CartProduct } from "./cartproduct.model.js";
import { Payment } from "./payment.model.js";
import { OrderProduct } from "./orderproduct.model.js";
import { Order } from "./order.model.js";
import { Category } from "./category.model.js";

const sequelize = new Sequelize({
  database: dbConfig.DB,
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  host: dbConfig.HOST,
  dialect: 'mysql',
  models: [Userinfo, Job, Stakeholder, RefreshToken, Product, Cart, CartProduct, 
    Category, Order, OrderProduct, Payment],
});

export default sequelize;
