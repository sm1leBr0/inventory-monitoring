// models/initModels.js

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "mysql", // or other dialects
});

const AuditLog = sequelize.define("AuditLog", {
  method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = { sequelize, AuditLog };
