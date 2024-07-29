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

// Import models
db.Equipment = require("./equipment")(sequelize, DataTypes);
db.User = require("./user")(sequelize, DataTypes);
db.EquipmentVersion = require("./equipmentVersion")(sequelize, DataTypes);
db.UserDetails = require("./userDetails")(sequelize, DataTypes);
db.EquipmentCard = require("./equipmentCard")(sequelize, DataTypes);

// Initialize associations
const initModels = () => {
  db.Equipment.belongsTo(db.EquipmentCard, {
    foreignKey: "name",
    targetKey: "name",
  });
  db.Equipment.hasMany(db.EquipmentVersion, {
    foreignKey: "equipmentId",
    sourceKey: "inventoryNumber",
  });
  db.Equipment.belongsTo(db.UserDetails, {
    foreignKey: "user",
    targetKey: "fullName",
  });

  db.EquipmentCard.hasMany(db.Equipment, {
    foreignKey: "name",
    sourceKey: "name",
  });

  db.EquipmentVersion.belongsTo(db.Equipment, {
    foreignKey: "equipmentId",
    targetKey: "inventoryNumber",
  });

  db.UserDetails.hasMany(db.Equipment, {
    foreignKey: "user",
    sourceKey: "fullName",
  });
};

initModels();

module.exports = db;
