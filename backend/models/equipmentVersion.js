module.exports = (sequelize, DataTypes) => {
  const EquipmentVersion = sequelize.define("EquipmentVersion", {
    equipmentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  EquipmentVersion.associate = (models) => {
    EquipmentVersion.belongsTo(models.Equipment, {
      foreignKey: "equipmentId",
      targetKey: "inventoryNumber",
    });
  };

  return EquipmentVersion;
};
