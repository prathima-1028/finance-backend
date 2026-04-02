const db = require("../db"); // ✅ correct path

// 🔹 SUMMARY: Total Income, Expense, Net Balance
const getSummary = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS totalIncome,
        SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS totalExpense
      FROM records
      WHERE is_deleted = 0
    `;

    db.get(query, [], (err, row) => {
      if (err) {
        return reject(err);
      }

      // ✅ Safe handling if no data exists
      const totalIncome = row?.totalIncome || 0;
      const totalExpense = row?.totalExpense || 0;

      resolve({
        totalIncome,
        totalExpense,
        netBalance: totalIncome - totalExpense,
      });
    });
  });
};

// 🔹 CATEGORY-WISE TOTALS
const getCategoryTotals = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT category, SUM(amount) AS total
      FROM records
      WHERE is_deleted = 0
      GROUP BY category
    `;

    db.all(query, [], (err, rows) => {
      if (err) {
        return reject(err);
      }

      // ✅ Safe fallback
      resolve(rows || []);
    });
  });
};

module.exports = {
  getSummary,
  getCategoryTotals,
};