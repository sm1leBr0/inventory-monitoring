const { EquipmentCard } = require("../models/initModels");
const { Op } = require("sequelize");

// Get all equipment cards with filtering and sorting
exports.getAllEquipmentCards = async (req, res) => {
  const { name, technicalCharacteristics, sortField, sortOrder } = req.query;

  let whereClause = {};
  if (name) {
    whereClause.name = { [Op.like]: `%${name}%` };
  }
  if (technicalCharacteristics) {
    whereClause.technicalCharacteristics = {
      [Op.like]: `%${technicalCharacteristics}%`,
    };
  }

  let orderClause = [];
  if (sortField && sortOrder) {
    orderClause.push([sortField, sortOrder]);
  }

  try {
    const equipmentCards = await EquipmentCard.findAll({
      where: whereClause,
      order: orderClause,
    });
    res.status(200).json(equipmentCards);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single equipment card by ID
exports.getEquipmentCardById = async (req, res) => {
  try {
    const equipmentCard = await EquipmentCard.findByPk(req.params.id);
    if (!equipmentCard) {
      return res.status(404).json({ error: "Equipment card not found" });
    }
    res.status(200).json(equipmentCard);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new equipment card
exports.createEquipmentCard = async (req, res) => {
  try {
    const newEquipmentCard = await EquipmentCard.create(req.body);
    res.status(201).json(newEquipmentCard);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an equipment card
exports.updateEquipmentCard = async (req, res) => {
  try {
    const equipmentCard = await EquipmentCard.findByPk(req.params.id);
    if (!equipmentCard) {
      return res.status(404).json({ error: "Equipment card not found" });
    }
    await equipmentCard.update(req.body);
    res.status(200).json(equipmentCard);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an equipment card
exports.deleteEquipmentCard = async (req, res) => {
  try {
    const equipmentCard = await EquipmentCard.findByPk(req.params.id);
    if (!equipmentCard) {
      return res.status(404).json({ error: "Equipment card not found" });
    }
    await equipmentCard.destroy();
    res.status(204).json({ message: "Equipment card deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
