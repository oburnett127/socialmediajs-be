"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, Sequelize) {
    var Job = sequelize.define("job", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Job title"
        },
        desc: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Job description"
        },
        requirements: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: "Job requirements"
        },
        postDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });
    return Job;
});
