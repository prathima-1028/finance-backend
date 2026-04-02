const db = require("../db");
const bcrypt = require("bcryptjs");

// 🔹 CREATE USER
const createUser = async ({ name, email, password, role }) => {
  return new Promise(async (resolve, reject) => {
    if (!name || !email || !password || !role) {
      return reject(new Error("All fields are required"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password, role, status)
      VALUES (?, ?, ?, ?, 'active')
    `;

    db.run(query, [name, email, hashedPassword, role], function (err) {
      if (err) return reject(err);

      resolve({
        message: "User created successfully",
        userId: this.lastID,
      });
    });
  });
};

// 🔹 GET ALL USERS (Admin)
const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT id, name, email, role, status FROM users", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// 🔹 UPDATE USER STATUS
const updateUserStatus = (id, status) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE users SET status = ? WHERE id = ?`;

    db.run(query, [status, id], function (err) {
      if (err) reject(err);
      else resolve({ message: "User status updated" });
    });
  });
};

module.exports = {
  createUser,
  getUsers,
  updateUserStatus,
};