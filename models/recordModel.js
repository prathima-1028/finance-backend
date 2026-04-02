const db = require("../db");

// Create record
const createRecord = (data, callback) => {
  const { amount, type, category, date, note, created_by } = data;

  const query = `
    INSERT INTO records (amount, type, category, date, note, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [amount, type, category, date, note, created_by], function (err) {
    callback(err, this?.lastID);
  });
};

// Get records with filters
const getRecords = (filters, callback) => {
  let query = `SELECT * FROM records WHERE is_deleted = 0`;
  const params = [];

  if (filters.type) {
    query += ` AND type = ?`;
    params.push(filters.type);
  }

  if (filters.category) {
    query += ` AND category = ?`;
    params.push(filters.category);
  }

  if (filters.startDate && filters.endDate) {
    query += ` AND date BETWEEN ? AND ?`;
    params.push(filters.startDate, filters.endDate);
  }

  db.all(query, params, (err, rows) => {
    callback(err, rows);
  });
};

// Soft delete
const deleteRecord = (id, callback) => {
  const query = `UPDATE records SET is_deleted = 1 WHERE id = ?`;

  db.run(query, [id], function (err) {
    callback(err);
  });
};
// 🔹 Pagination records
const getRecordsWithPagination = (query, params, callback) => {
  db.all(query, params, callback);
};

// 🔹 Total count
const getCount = (query, params, callback) => {
  db.get(query, params, (err, row) => {
    if (err) callback(err);
    else callback(null, row);
  });
};
module.exports = {
  createRecord,
  getRecords,
  deleteRecord,
  getRecordsWithPagination,
  getCount,
};