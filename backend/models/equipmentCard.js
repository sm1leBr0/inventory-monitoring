module.exports = (sequelize, DataTypes) => {
  const EquipmentCard = sequelize.define("EquipmentCard", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    technicalCharacteristics: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  EquipmentCard.associate = (models) => {
    EquipmentCard.hasMany(models.Equipment, {
      foreignKey: "name",
      sourceKey: "name",
    });
  };

  return EquipmentCard;
};
