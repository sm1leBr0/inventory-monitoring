module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define("Equipment", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inventoryNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Equipment.associate = (models) => {
    Equipment.belongsTo(models.EquipmentCard, {
      foreignKey: "name",
      targetKey: "name",
    });
    Equipment.hasMany(models.EquipmentVersion, {
      foreignKey: "equipmentId",
      sourceKey: "inventoryNumber",
    });
    Equipment.belongsTo(models.UserDetails, {
      foreignKey: "user",
      targetKey: "fullName",
    });
  };

  return Equipment;
};
