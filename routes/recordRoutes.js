const express = require("express");
const router = express.Router();

const recordController = require("../controllers/recordController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// 🔹 CREATE (Admin only)
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  recordController.createRecord
);

/**
 * @swagger
 * /records:
 *   get:
 *     summary: Get all records
 *     description: Fetch paginated financial records
 *     responses:
 *       200:
 *         description: List of records
 */
router.get(
  "/",
  authMiddleware,
  authorizeRoles("analyst", "admin"),
  recordController.getRecords
);

// 🔹 DELETE (Admin only)
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  recordController.deleteRecord
);

module.exports = router;