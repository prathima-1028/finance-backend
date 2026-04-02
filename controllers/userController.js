const userService = require("../services/userService");

// 🔹 CREATE USER
const createUser = async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔹 GET USERS
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 UPDATE STATUS
const updateStatus = async (req, res) => {
  try {
    const result = await userService.updateUserStatus(
      req.params.id,
      req.body.status
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateStatus,
};