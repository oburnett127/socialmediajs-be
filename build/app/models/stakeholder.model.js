"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (sequelize, Sequelize) {
    var Stakeholder = sequelize.define("stakeholder", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
    return Stakeholder;
});
