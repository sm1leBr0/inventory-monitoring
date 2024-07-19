module.exports = (sequelize, DataTypes) => {
  const EquipmentVersion = sequelize.define("EquipmentVersion", {
    equipmentId: {
      type: DataTypes.INTEGER,
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

  return EquipmentVersion;
};
