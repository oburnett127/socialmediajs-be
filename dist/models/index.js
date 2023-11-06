"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const db_config_1 = __importDefault(require("../config/db.config")); // assuming export default is used in db.config.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(db_config_1.default.DB, db_config_1.default.USER, db_config_1.default.PASSWORD, {
    host: db_config_1.default.HOST,
    dialect: 'mysql',
    pool: {
        max: db_config_1.default.pool.max,
        min: db_config_1.default.pool.min,
        acquire: db_config_1.default.pool.acquire,
        idle: db_config_1.default.pool.idle
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
const job_model_1 = __importDefault(require("./job.model"));
const stakeholder_model_1 = __importDefault(require("./stakeholder.model"));
const userinfo_model_1 = __importDefault(require("./userinfo.model"));
exports.db = {
    Sequelize: sequelize_1.Sequelize,
    sequelize,
    jobs: (0, job_model_1.default)(sequelize, sequelize_1.Sequelize),
    stakeholder: (0, stakeholder_model_1.default)(sequelize, sequelize_1.Sequelize),
    userinfo: (0, userinfo_model_1.default)(sequelize, sequelize_1.Sequelize), // Assuming UserInfo is initialized this way
};
