const authService = require("../services/authService");

// Register Controller
const registerUser = async (req, res) => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user: result,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login Controller
const loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};