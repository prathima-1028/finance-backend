const db = require("../db");

// Create user
const createUser = (name, email, password, role, callback) => {
  const query = `
    INSERT INTO users (name, email, password, role, status)
    VALUES (?, ?, ?, ?, 'active')
  `;
  db.run(query, [name, email, password, role], function (err) {
    callback(err, this?.lastID);
  });
};

// Find user by email
const findUserByEmail = (email, callback) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, row) => {
    callback(err, row);
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};