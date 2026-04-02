const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// 🔹 Create user (Admin only)
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  userController.createUser
);

// 🔹 Get all users (Admin only)
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  userController.getUsers
);

// 🔹 Update user status
router.put(
  "/:id/status",
  authMiddleware,
  authorizeRoles("admin"),
  userController.updateStatus
);

module.exports = router;