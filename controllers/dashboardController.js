const dashboardService = require("../services/dashboardService");

// 🔹 Summary
const getSummary = async (req, res) => {
  try {
    const result = await dashboardService.getSummary();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔹 Category totals
const getCategoryTotals = async (req, res) => {
  try {
    const result = await dashboardService.getCategoryTotals();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getSummary,
  getCategoryTotals,
};