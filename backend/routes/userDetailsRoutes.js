const express = require("express");
const router = express.Router();
const userDetailsController = require("../controllers/userDetailsController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Routes for user details
router.get("/", verifyToken, userDetailsController.getAllUserDetails);
router.get("/:id", verifyToken, userDetailsController.getUserDetailsById);
router.post("/", verifyToken, isAdmin, userDetailsController.createUserDetails);
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  userDetailsController.updateUserDetails
);
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  userDetailsController.deleteUserDetails
);

module.exports = router;
