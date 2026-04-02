const recordModel = require("../models/recordModel");

// 🔹 CREATE RECORD
const addRecord = (data, user) => {
  return new Promise((resolve, reject) => {
    const { amount, type, category, date, note } = data;

    if (!amount || !type) {
      return reject(new Error("Amount and type are required"));
    }

    if (!["income", "expense"].includes(type)) {
      return reject(new Error("Type must be 'income' or 'expense'"));
    }

    if (amount <= 0) {
      return reject(new Error("Amount must be greater than 0"));
    }

    const recordData = {
      amount,
      type,
      category,
      date,
      note,
      created_by: user.id,
    };

    recordModel.createRecord(recordData, (err, id) => {
      if (err) return reject(err);

      resolve({
        message: "Record created successfully",
        recordId: id,
      });
    });
  });
};

// 🔹 GET RECORDS WITH PAGINATION + FILTER
const fetchRecords = (filters) => {
  return new Promise((resolve, reject) => {
    let { page = 1, limit = 5, type, category } = filters;

    page = parseInt(page);
    limit = parseInt(limit);

    const offset = (page - 1) * limit;

    let baseQuery = `FROM records WHERE is_deleted = 0`;
    let params = [];

    // 🔹 Filters
    if (type) {
      baseQuery += ` AND type = ?`;
      params.push(type);
    }

    if (category) {
      baseQuery += ` AND category = ?`;
      params.push(category);
    }

    const dataQuery = `SELECT * ${baseQuery} LIMIT ? OFFSET ?`;
    const countQuery = `SELECT COUNT(*) as total ${baseQuery}`;

    // 🔹 Fetch records
    recordModel.getRecordsWithPagination(
      dataQuery,
      [...params, limit, offset],
      (err, rows) => {
        if (err) return reject(err);

        // 🔹 Fetch total count
        recordModel.getCount(countQuery, params, (err, countResult) => {
          if (err) return reject(err);

          const total = countResult.total;

          resolve({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: rows,
          });
        });
      }
    );
  });
};

// 🔹 DELETE RECORD
const removeRecord = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) return reject(new Error("Record ID is required"));

    recordModel.deleteRecord(id, (err) => {
      if (err) return reject(err);

      resolve({
        message: "Record deleted (soft delete)",
      });
    });
  });
};

module.exports = {
  addRecord,
  fetchRecords,
  removeRecord,
};