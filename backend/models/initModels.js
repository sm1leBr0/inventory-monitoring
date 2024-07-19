const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/db.js");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models here
db.Equipment = require("./equipment")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.EquipmentVersion = require("./equipmentVersion")(sequelize, DataTypes);
db.UserDetails = require("./userDetails")(sequelize, DataTypes);
db.EquipmentCard = require("./equipmentCard")(sequelize, DataTypes);

module.exports = db;
