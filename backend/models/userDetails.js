module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define("UserDetails", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    office: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  UserDetails.associate = (models) => {
    UserDetails.hasMany(models.Equipment, {
      foreignKey: "user",
      sourceKey: "fullName",
    });
  };

  return UserDetails;
};
