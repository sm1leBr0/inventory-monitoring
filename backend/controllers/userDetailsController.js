const { UserDetails } = require("../models/initModels");
const { Op } = require("sequelize");

// Get all user details with filtering and sorting
exports.getAllUserDetails = async (req, res) => {
  const { fullName, office, department, organization, sortField, sortOrder } =
    req.query;

  let whereClause = {};
  if (fullName) {
    whereClause.fullName = { [Op.like]: `%${fullName}%` };
  }
  if (office) {
    whereClause.office = { [Op.like]: `%${office}%` };
  }
  if (department) {
    whereClause.department = { [Op.like]: `%${department}%` };
  }
  if (organization) {
    whereClause.organization = { [Op.like]: `%${organization}%` };
  }

  let orderClause = [];
  if (sortField && sortOrder) {
    orderClause.push([sortField, sortOrder]);
  }

  try {
    const userDetails = await UserDetails.findAll({
      where: whereClause,
      order: orderClause,
    });
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single user detail by ID
exports.getUserDetailsById = async (req, res) => {
  try {
    const userDetails = await UserDetails.findByPk(req.params.id);
    if (!userDetails) {
      return res.status(404).json({ error: "User details not found" });
    }
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create new user details
exports.createUserDetails = async (req, res) => {
  try {
    const newUserDetails = await UserDetails.create(req.body);
    res.status(201).json(newUserDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user details
exports.updateUserDetails = async (req, res) => {
  try {
    const userDetails = await UserDetails.findByPk(req.params.id);
    if (!userDetails) {
      return res.status(404).json({ error: "User details not found" });
    }
    await userDetails.update(req.body);
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete user details
exports.deleteUserDetails = async (req, res) => {
  try {
    const userDetails = await UserDetails.findByPk(req.params.id);
    if (!userDetails) {
      return res.status(404).json({ error: "User details not found" });
    }
    await userDetails.destroy();
    res.status(204).json({ message: "User details deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
