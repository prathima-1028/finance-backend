const db = require("../db");

// 🔹 SUMMARY (income, expense, balance)
const getSummary = () => {
  const query = `
    SELECT 
      SUM(CASE WHEN type='income' THEN amount ELSE 0 END) as totalIncome,
      SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) as totalExpense
    FROM records
    WHERE is_deleted = 0
  `;

  const row = db.prepare(query).get();

  const totalIncome = row.totalIncome || 0;
  const totalExpense = row.totalExpense || 0;

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};

// 🔹 CATEGORY TOTALS
const getCategoryTotals = () => {
  const query = `
    SELECT category, SUM(amount) as total
    FROM records
    WHERE is_deleted = 0
    GROUP BY category
  `;

  return db.prepare(query).all();
};

module.exports = {
  getSummary,
  getCategoryTotals,
};