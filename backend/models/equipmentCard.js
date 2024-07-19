module.exports = (sequelize, DataTypes) => {
  const EquipmentCard = sequelize.define("EquipmentCard", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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

  return EquipmentCard;
};
