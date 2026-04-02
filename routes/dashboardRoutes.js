const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// 🔹 Summary (all roles)
router.get(
  "/summary",
  authMiddleware,
  authorizeRoles("viewer", "analyst", "admin"),
  dashboardController.getSummary
);

// 🔹 Category totals (analyst + admin)
router.get(
  "/category",
  authMiddleware,
  authorizeRoles("analyst", "admin"),
  dashboardController.getCategoryTotals
);

module.exports = router;