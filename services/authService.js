const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const userModel = require("../models/userModel");

// Register Service
const register = async (data) => {
  const { name, email, password, role } = data;

  // Validation
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    userModel.createUser(
      name,
      email,
      hashedPassword,
      role,
      (err, userId) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: userId, email, role });
        }
      }
    );
  });
};

// Login Service
const login = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new Error("Email and password required");
  }

  return new Promise((resolve, reject) => {
    userModel.findUserByEmail(email, async (err, user) => {
      if (err || !user) {
        return reject(new Error("User not found"));
      }

      if (user.status !== "active") {
        return reject(new Error("User is inactive"));
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return reject(new Error("Invalid credentials"));
      }

      // Generate token
      const token = generateToken(user);

      resolve({
        message: "Login successful",
        token,
      });
    });
  });
};

module.exports = {
  register,
  login,
};