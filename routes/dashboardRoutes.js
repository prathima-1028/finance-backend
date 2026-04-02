const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboardController");

const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get financial summary
 *     description: Returns total income, expense and net balance
 *     responses:
 *       200:
 *         description: Summary data
 */
router.get(
  "/summary",
  authMiddleware,
  dashboardController.getSummary
);

module.exports = router;