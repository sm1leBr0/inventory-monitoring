const express = require("express");
const router = express.Router();
const {
  EquipmentCard,
  UserDetails,
  User,
  Equipment,
} = require("../models/initModels");
const { Parser } = require("json2csv");

// Generate a custom report
router.get("/custom", async (req, res) => {
  const { reportType } = req.query;

  try {
    let data;
    if (reportType === "equipment") {
      data = await Equipment.findAll();
    } else if (reportType === "userDetails") {
      data = await UserDetails.findAll();
    } else if (reportType === "users") {
      data = await User.findAll();
    } else if (reportType === "equipmentCard") {
      data = await EquipmentCard.findAll();
    } else {
      return res.status(400).json({ error: "Invalid report type" });
    }

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment(`${reportType}-report.csv`);
    return res.send(csv);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
