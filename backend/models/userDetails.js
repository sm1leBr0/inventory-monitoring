module.exports = (sequelize, DataTypes) => {
  const UserDetails = sequelize.define("UserDetails", {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
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

  return UserDetails;
};
