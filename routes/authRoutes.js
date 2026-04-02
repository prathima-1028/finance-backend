const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

router.post("/register", registerUser);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and return JWT token
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginUser);
router.post("/login", loginUser);

module.exports = router;