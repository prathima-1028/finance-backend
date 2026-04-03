const db = require("../db");

// 🔹 CREATE RECORD
const addRecord = (data, userId) => {
  const { amount, type, category, date, note } = data;

  const query = `
    INSERT INTO records (amount, type, category, date, note, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const result = db
    .prepare(query)
    .run(amount, type, category, date, note, userId);

  return result.lastInsertRowid;
};

// 🔹 GET RECORDS WITH PAGINATION + FILTER
const getRecords = (filters, page = 1, limit = 10) => {
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

  // Pagination
  const offset = (page - 1) * limit;
  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const data = db.prepare(query).all(...params);

  // Total count
  const countQuery = `SELECT COUNT(*) as total FROM records WHERE is_deleted = 0`;
  const totalResult = db.prepare(countQuery).get();
  const total = totalResult.total;

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data,
  };
};

// 🔹 DELETE (SOFT DELETE)
const deleteRecord = (id) => {
  const query = `UPDATE records SET is_deleted = 1 WHERE id = ?`;

  const result = db.prepare(query).run(id);

  return result.changes; // number of rows affected
};

module.exports = {
  addRecord,
  getRecords,
  deleteRecord,
};