const db = require("../db");
const bcrypt = require("bcrypt");

// 🔹 CREATE USER
const createUser = async (name, email, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (name, email, password, role, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  const result = db
    .prepare(query)
    .run(name, email, hashedPassword, role, "active");

  return result.lastInsertRowid;
};

// 🔹 FIND USER BY EMAIL
const findUserByEmail = (email) => {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email);
};

// 🔹 UPDATE USER STATUS
const updateUserStatus = (id, status) => {
  const query = `UPDATE users SET status = ? WHERE id = ?`;
  return db.prepare(query).run(status, id);
};

module.exports = {
  createUser,
  findUserByEmail,
  updateUserStatus,
};