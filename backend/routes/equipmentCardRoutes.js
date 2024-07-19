const express = require("express");
const router = express.Router();
const equipmentCardController = require("../controllers/equipmentCardController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Routes for equipment cards
router.get("/", verifyToken, equipmentCardController.getAllEquipmentCards);
router.get("/:id", verifyToken, equipmentCardController.getEquipmentCardById);
router.post(
  "/",
  verifyToken,
  isAdmin,
  equipmentCardController.createEquipmentCard
);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  equipmentCardController.updateEquipmentCard
);
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  equipmentCardController.deleteEquipmentCard
);

module.exports = router;
