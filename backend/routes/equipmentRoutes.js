const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");
const { verifyToken, isAdmin } = require("../middleware/auth");

router.get("/export", verifyToken, equipmentController.exportEquipmentToExcel);
router.get("/", verifyToken, equipmentController.getAllEquipment);
router.get("/:id", verifyToken, equipmentController.getEquipmentById);
router.post("/", verifyToken, isAdmin, equipmentController.createEquipment);
router.put("/:id", verifyToken, isAdmin, equipmentController.updateEquipment);
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  equipmentController.deleteEquipment
);
router.get(
  "/:id/versions",
  verifyToken,
  equipmentController.getEquipmentVersions
);

module.exports = router;
