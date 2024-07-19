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

  return Equipment;
};
