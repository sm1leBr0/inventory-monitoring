const db = require("../models/initModels");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const Equipment = db.Equipment;
const EquipmentVersion = db.EquipmentVersion;
const { Op } = require("sequelize");

exports.exportEquipmentToExcel = async (req, res) => {
  try {
    // Fetch equipment data from database (example query)
    const equipmentData = await Equipment.findAll();

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Equipment");

    // Define columns in the Excel sheet
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Description", key: "description", width: 50 },
      // Add more columns as needed
    ];

    // Populate rows with data
    equipmentData.forEach((equipment) => {
      worksheet.addRow({
        id: equipment.id,
        name: equipment.name,
        description: equipment.description,
        // Add more fields as needed
      });
    });

    // Set response headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=equipment.xlsx");

    // Stream the Excel workbook to the response
    await workbook.xlsx.write(res);
    res.end();

    console.log("Excel file generated successfully.");
  } catch (error) {
    console.error("Error generating Excel:", error);
    res.status(500).json({ error: "Failed to generate Excel file." });
  }
};

exports.getAllEquipment = async (req, res) => {
  try {
    const {
      name,
      inventoryNumber,
      location,
      user,
      sortField = "id",
      sortOrder = "ASC",
      page = 1,
      limit = 10,
    } = req.query;

    let whereClause = {};
    if (name) {
      whereClause.name = { [Op.like]: `%${name}%` };
    }
    if (inventoryNumber) {
      whereClause.inventoryNumber = { [Op.like]: `%${inventoryNumber}%` };
    }
    if (location) {
      whereClause.location = { [Op.like]: `%${location}%` };
    }
    if (user) {
      whereClause.user = { [Op.like]: `%${user}%` };
    }

    const offset = (page - 1) * limit;

    const equipment = await Equipment.findAll({
      where: whereClause,
      order: [[sortField, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalCount = await Equipment.count({ where: whereClause });

    res.status(200).json({
      data: equipment,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: parseInt(page),
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching equipment" });
  }
};

exports.getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      res.status(200).json(equipment);
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching equipment" });
  }
};

exports.createEquipment = async (req, res) => {
  try {
    const newEquipment = await Equipment.create(req.body);
    await EquipmentVersion.create({
      equipmentId: newEquipment.id,
      version: 1,
      data: req.body,
    });
    res.status(201).json(newEquipment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating equipment" });
  }
};

exports.updateEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) {
      return res.status(404).json({ error: "Equipment not found" });
    }

    await equipment.update(req.body);

    const latestVersion = await EquipmentVersion.findOne({
      where: { equipmentId: equipment.id },
      order: [["version", "DESC"]],
    });

    const newVersion = latestVersion ? latestVersion.version + 1 : 1;

    await EquipmentVersion.create({
      equipmentId: equipment.id,
      version: newVersion,
      data: req.body,
    });

    res.status(200).json(equipment);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating equipment" });
  }
};

exports.getEquipmentVersions = async (req, res) => {
  try {
    const versions = await EquipmentVersion.findAll({
      where: { equipmentId: req.params.id },
      order: [["version", "ASC"]],
    });
    res.status(200).json(versions);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching equipment versions" });
  }
};

exports.deleteEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      await equipment.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Equipment not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting equipment" });
  }
};
